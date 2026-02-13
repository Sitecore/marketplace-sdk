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
  /**
   * Only keep operations whose operationId is in this list.
   * Mutually exclusive with `excludeOperationIds`.
   *
   * @default undefined
   */
  includeOperationIds?: string[];
  /**
   * Remove operations whose operationId is in this list.
   * Mutually exclusive with `includeOperationIds`.
   *
   * @default undefined
   */
  excludeOperationIds?: string[];
  /**
   * Only keep operations that have at least one matching tag.
   * Mutually exclusive with `excludeTags`.
   *
   * @default undefined
   */
  includeTags?: string[];
  /**
   * Remove operations that have any matching tag.
   * Mutually exclusive with `includeTags`.
   *
   * @default undefined
   */
  excludeTags?: string[];
}
