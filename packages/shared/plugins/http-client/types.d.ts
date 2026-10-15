export interface Config {
  /**
   * Plugin name. Absolute path of the client entry file.
   */
  name: string;
  /**
   * Name of the generated file.
   *
   * @default 'client'
   */
  output?: string;
  /**
   * Set the generated client's `baseUrl` from the spec servers.
   *
   * @default true
   */
  baseUrl?: string | number | boolean;
  /**
   * Copy the client into the output folder.
   *
   * @default false
   */
  bundle?: boolean;
  /**
   * Re-export the client from the generated index file.
   *
   * @default false
   */
  exportFromIndex?: boolean;
  /**
   * Throw on error responses instead of returning them.
   *
   * @default false
   */
  throwOnError?: boolean;
}
