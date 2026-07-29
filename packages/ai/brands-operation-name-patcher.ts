import type { Plugin } from '@hey-api/openapi-ts';

export const handler: Plugin.Handler<{}> = ({ context }) => {
  const ir = context.ir;

  if (!ir?.paths) {
    return;
  }

  for (const path in ir.paths) {
    const methods = ir.paths[path] as Record<string, any>;

    for (const method of HTTP_METHODS) {
      const operation = methods[method];

      if (!operation) {
        continue;
      }

      if (path === LEGACY_SECTION_FIELDS_PATH) {
        if (method === 'get') {
          operation.id = 'listBrandKitSectionFieldsLegacy';
        } else if (method === 'post') {
          operation.id = 'createBrandKitSectionFieldLegacy';
        }
      }

      if (path === LEGACY_SECTION_FIELD_PATH) {
        if (method === 'get') {
          operation.id = 'getBrandKitSectionFieldLegacy';
        } else if (method === 'patch') {
          operation.id = 'updateBrandKitSectionFieldLegacy';
        }
      }
    }
  }
};

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

const LEGACY_SECTION_FIELDS_PATH = '/api/brands/v1/organizations/{organizationId}/brandkits/{brandkitId}/sections/{sectionId}/fields';
const LEGACY_SECTION_FIELD_PATH = '/api/brands/v1/organizations/{organizationId}/brandkits/{brandkitId}/sections/{sectionId}/fields/{fieldId}';

export const defaultBrandsOperationNamePatcherConfig: Plugin.Config<{}> = {
  _dependencies: [],
  _handler: handler,
  _handlerLegacy: () => {},
  name: '@sitecore-marketplace-sdk/ai-brands-operation-name-patcher',
  output: 'client',
};

export const defineBrandsOperationNamePatcherConfig: Plugin.DefineConfig<{}> = () => ({
  ...defaultBrandsOperationNamePatcherConfig,
});