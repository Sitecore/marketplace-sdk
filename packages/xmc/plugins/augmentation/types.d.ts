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
  /**
   * Mark all operations in this namespace as deprecated
   *
   * @default false
   */
  deprecated?: boolean;
  /**
   * Custom deprecation message
   * If not provided, a default message will be used
   *
   * @example 'Use xmc.sites or xmc.pages instead'
   */
  deprecationMessage?: string;
}
