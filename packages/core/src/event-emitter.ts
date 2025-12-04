type EventHandler<T = any> = (data: T) => void;

/**
 * A simple event emitter implementation that provides type-safe event handling.
 * Supports subscribing to events, unsubscribing, and emitting events with payloads.
 * Events are handled synchronously and any errors in handlers are caught and logged.
 */
export class EventEmitter {
  /** Map of event names to their set of handlers */
  private handlers = new Map<string, Set<EventHandler>>();

  /**
   * Subscribes to an event.
   * @param event - The name of the event to listen for
   * @param handler - The callback function to execute when the event occurs
   * @returns A function that can be called to unsubscribe from the event
   *
   * @example
   * ```typescript
   * const unsubscribe = emitter.on('userUpdate', (data: UserData) => {
   *   console.log('User updated:', data);
   * });
   *
   * // Later, to stop listening:
   * unsubscribe();
   * ```
   */
  on<T>(event: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);

    // Return unsubscribe function
    return () => this.off(event, handler);
  }

  /**
   * Unsubscribes a handler from an event.
   * If this was the last handler for the event, the event is removed from the handlers map.
   * @param event - The name of the event to unsubscribe from
   * @param handler - The handler function to remove
   */
  off<T>(event: string, handler: EventHandler<T>): void {
    this.handlers.get(event)?.delete(handler);

    // Clean up empty sets
    if (this.handlers.get(event)?.size === 0) {
      this.handlers.delete(event);
    }
  }

  /**
   * Emits an event with the provided data. In addition to calling handlers for the specific event,
   * it also calls any wildcard ('*') handlers. Wildcard handlers receive an object with { event, payload }.
   */
  emit<T>(event: string, data: T): void {
    // Emit to specific handlers.
    this.handlers.get(event)?.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error('Error in event handler for %s:', event, error);
      }
    });

    // Emit to wildcard handlers.
    this.handlers.get('*')?.forEach((handler) => {
      try {
        // Wildcard handler signature: (data: { event: string; payload: T }) => void
        (handler as any)({ event, payload: data });
      } catch (error) {
        console.error('Error in wildcard handler for %s:', event, error);
      }
    });
  }

  /**
   * Removes all event handlers.
   * After calling this method, no events will be handled until new handlers are registered.
   */
  clear(): void {
    this.handlers.clear();
  }

  /**
   * Checks if an event has any active listeners.
   * @param event - The name of the event to check
   * @returns True if the event has at least one handler, false otherwise
   */
  hasListeners(event: string): boolean {
    return this.handlers.has(event) && this.handlers.get(event)!.size > 0;
  }
}
