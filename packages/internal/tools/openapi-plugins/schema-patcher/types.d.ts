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
}
