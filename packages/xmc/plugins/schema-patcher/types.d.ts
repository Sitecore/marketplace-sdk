export interface Config {
  /**
   * Plugin name. Must be unique.
   */
  name: '@sitecore-marketplace/schema-patcher';
  /**
   * Name of the generated file.
   *
   * @default 'client'
   */
  output?: string;
  /**
   * Base URL to set in schema.servers[0].url
   * Takes precedence over basePath if both are provided.
   * If not provided, the original server URL from the schema will be used.
   *
   * @default undefined
   */
  baseUrl?: string;
  /**
   * Base path to append to the default edge platform URL.
   * Constructs: https://edge-platform.sitecorecloud.io{basePath}
   * Ignored if baseUrl is provided.
   *
   * @example '/authoring' -> 'https://edge-platform.sitecorecloud.io/authoring'
   * @example '/stream/ai-agent-api/' -> 'https://edge-platform.sitecorecloud.io/stream/ai-agent-api/'
   * @default undefined
   */
  basePath?: string;
}
