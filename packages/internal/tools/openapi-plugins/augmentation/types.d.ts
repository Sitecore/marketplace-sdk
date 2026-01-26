export interface Config {
  /**
   * Plugin name. Must be unique.
   */
  name: '@sitecore-marketplace/augmentation';
  /**
   * Name of the generated file.
   *
   * @default 'augmentation'
   */
  output?: string;
  /**
   * Operation namespace
   *
   */
  namespaces?: string[];
}
