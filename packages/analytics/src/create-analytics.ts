import { DEFAULT_BATCH, DEFAULT_RETRY } from './constants';
import { normalizeEvent } from './normalize';
import { isClientErrorStatus, isSuccessStatus, postTelemetry } from './transport';
import type {
  AnalyticsClient,
  AnalyticsEventInput,
  AnalyticsEventType,
  AnalyticsTrackProps,
  AnalyticsWireEvent,
  CreateAnalyticsConfig,
} from './types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function retryDelayMs(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  const exp = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
  return Math.floor(exp * (0.5 + Math.random() * 0.5));
}

function asEventInput(
  typeOrEvent: AnalyticsEventType | AnalyticsEventInput,
  props?: AnalyticsTrackProps,
): AnalyticsEventInput | undefined {
  if (typeof typeOrEvent === 'string') {
    if (!props) {
      return undefined;
    }
    return { ...props, type: typeOrEvent };
  }

  return typeOrEvent;
}

function attachPageHide(flushHidden: () => void): () => void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return () => undefined;
  }

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      flushHidden();
    }
  };
  const onPageHide = () => {
    flushHidden();
  };

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);

  return () => {
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onPageHide);
  };
}

/**
 * Create an analytics client that queues insight events and POSTs them to the Ingestion API.
 *
 * Events flush when the batch is full, `maxWaitMs` elapses, {@link AnalyticsClient.flush} is called,
 * {@link AnalyticsClient.shutdown} is called, or the page becomes hidden.
 * Page-hide delivery uses `fetch` with `keepalive: true` so the `Authorization` header can be set.
 *
 * @param config - Endpoint, token provider, and optional batching / retry / sampling / kill switch.
 * @returns A client whose `track`, `flush`, and `shutdown` methods never throw.
 *
 * @example
 * ```ts
 * const analytics = createAnalytics({
 *   endpoint: 'https://api.sitecorecloud.io/api/marketplace/v1/telemetry',
 *   getAccessToken: () => host.getAccessToken(),
 * });
 *
 * await analytics.track('listing.view', { appId: 'app-42' });
 * await analytics.flush();
 * await analytics.shutdown();
 * ```
 */
export function createAnalytics(config: CreateAnalyticsConfig): AnalyticsClient {
  const maxSize = config.batch?.maxSize ?? DEFAULT_BATCH.maxSize;
  const maxWaitMs = config.batch?.maxWaitMs ?? DEFAULT_BATCH.maxWaitMs;
  const maxQueue = config.batch?.maxQueue ?? DEFAULT_BATCH.maxQueue;
  const maxAttempts = Math.max(1, config.retry?.maxAttempts ?? DEFAULT_RETRY.maxAttempts);
  const baseDelayMs = config.retry?.baseDelayMs ?? DEFAULT_RETRY.baseDelayMs;
  const maxDelayMs = config.retry?.maxDelayMs ?? DEFAULT_RETRY.maxDelayMs;
  const sampling = config.sampling ?? 1;
  const enabled = config.enabled !== false;

  const queue: AnalyticsWireEvent[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  let inFlight: Promise<void> | undefined;
  let accepting = true;

  const notifyError = (error: unknown, batch?: AnalyticsWireEvent[]) => {
    try {
      config.onError?.(error, batch);
    } catch {
      // onError must never surface to the caller
    }
  };

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const scheduleFlush = () => {
    if (!accepting || timer !== undefined || queue.length === 0) {
      return;
    }
    timer = setTimeout(() => {
      timer = undefined;
      void runFlush(false);
    }, maxWaitMs);
  };

  const enqueue = (event: AnalyticsWireEvent) => {
    queue.push(event);
    while (queue.length > maxQueue) {
      const dropped = queue.shift();
      if (dropped) {
        notifyError(new Error('analytics queue overflow'), [dropped]);
      }
    }

    if (queue.length >= maxSize) {
      clearTimer();
      void runFlush(false);
      return;
    }

    scheduleFlush();
  };

  const sendBatch = async (batch: AnalyticsWireEvent[], keepalive: boolean): Promise<'ok' | 'drop' | 'retry'> => {
    let token: string;
    try {
      token = await config.getAccessToken();
    } catch (error) {
      notifyError(error, batch);
      return 'retry';
    }

    if (!token || token.trim().length === 0) {
      notifyError(new Error('analytics access token missing'), batch);
      return 'retry';
    }

    try {
      const response = await postTelemetry({
        endpoint: config.endpoint,
        token,
        events: batch,
        keepalive,
      });

      if (isSuccessStatus(response.status)) {
        return 'ok';
      }

      if (isClientErrorStatus(response.status)) {
        notifyError(new Error(`analytics ingest rejected: ${response.status}`), batch);
        return 'drop';
      }

      notifyError(new Error(`analytics ingest failed: ${response.status}`), batch);
      return 'retry';
    } catch (error) {
      notifyError(error, batch);
      return 'retry';
    }
  };

  const runFlush = (keepalive: boolean): Promise<void> => {
    if (inFlight) {
      return inFlight;
    }

    inFlight = (async () => {
      clearTimer();
      let retryLater = false;

      while (queue.length > 0) {
        const batch = queue.splice(0, maxSize);
        let outcome: 'ok' | 'drop' | 'retry' = 'retry';

        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
          outcome = await sendBatch(batch, keepalive);
          if (outcome !== 'retry') {
            break;
          }
          if (attempt < maxAttempts - 1) {
            await delay(retryDelayMs(attempt, baseDelayMs, maxDelayMs));
          }
        }

        if (outcome === 'retry') {
          queue.unshift(...batch);
          if (queue.length > maxQueue) {
            queue.splice(maxQueue);
          }
          retryLater = true;
          break;
        }
      }

      return retryLater;
    })()
      .then((retryLater) => {
        inFlight = undefined;
        if (!accepting) {
          return;
        }
        if (retryLater) {
          scheduleFlush();
          return;
        }
        if (queue.length >= maxSize) {
          void runFlush(false);
        } else if (queue.length > 0) {
          scheduleFlush();
        }
      })
      .catch((error) => {
        inFlight = undefined;
        notifyError(error);
      });

    return inFlight;
  };

  const detachPageHide = attachPageHide(() => {
    void runFlush(true);
  });

  const track = async (
    typeOrEvent: AnalyticsEventType | AnalyticsEventInput,
    props?: AnalyticsTrackProps,
  ): Promise<void> => {
    try {
      if (!accepting || !enabled) {
        return;
      }

      if (sampling < 1 && Math.random() >= sampling) {
        return;
      }

      const input = asEventInput(typeOrEvent, props);
      if (!input) {
        return;
      }

      const event = normalizeEvent(input);
      if (!event) {
        notifyError(new Error('analytics event dropped: invalid type or appId'));
        return;
      }

      enqueue(event);
    } catch (error) {
      notifyError(error);
    }
  };

  return {
    track,
    flush: () => runFlush(false),
    shutdown: async () => {
      try {
        accepting = false;
        detachPageHide();
        clearTimer();
        await runFlush(true);
      } catch (error) {
        notifyError(error);
      }
    },
  };
}
