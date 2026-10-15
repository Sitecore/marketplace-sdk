import type { Client, Plugin } from '@hey-api/openapi-ts';

export type Config = Plugin.Name<string> &
  Client.Config & {
    /**
     * Throw on error responses instead of returning them.
     *
     * @default false
     */
    throwOnError?: boolean;
  };
