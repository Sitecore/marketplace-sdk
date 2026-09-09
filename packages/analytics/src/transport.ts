import type { AnalyticsWireEvent } from './types';

export interface TransportRequest {
  endpoint: string;
  token: string;
  events: AnalyticsWireEvent[];
  keepalive?: boolean;
}

export async function postTelemetry(request: TransportRequest): Promise<Response> {
  return fetch(request.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${request.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ events: request.events }),
    keepalive: request.keepalive === true,
  });
}

export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

export function isClientErrorStatus(status: number): boolean {
  return status >= 400 && status < 500;
}
