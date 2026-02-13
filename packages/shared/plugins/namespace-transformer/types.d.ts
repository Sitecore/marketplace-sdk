export interface Config {
  /**
   * Plugin name. Must be unique.
   */
  name: '@sitecore-marketplace/namespace-transformer';
  /**
   * Name of the generated file.
   *
   * @default 'client'
   */
  output?: string;
  /**
   * Namespace to wrap exported types.
   *
   */
  namespace: string;
}
