import { createClient } from '@hey-api/openapi-ts';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

async function createPatchedBrandsSchemaPath(): Promise<string> {
  const response = await fetch('https://ai-brands-api-euw.sitecorecloud.io/openapi.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch brands schema: ${response.status} ${response.statusText}`);
  }

  const schema = (await response.json()) as Record<string, any>;

  const pathRenames: Array<{
    path: string;
    method: 'get' | 'post' | 'patch';
    operationId: string;
  }> = [
    {
      path: '/api/brands/v2/organizations/{organizationId}/brandkits/{brandkitId}/sections/{sectionId}/fields',
      method: 'get',
      operationId: 'list_brand_kit_section_fields_v2',
    },
    {
      path: '/api/brands/v2/organizations/{organizationId}/brandkits/{brandkitId}/sections/{sectionId}/fields',
      method: 'post',
      operationId: 'create_brand_kit_section_field_v2',
    },
    {
      path: '/api/brands/v2/organizations/{organizationId}/brandkits/{brandkitId}/sections/{sectionId}/fields/{fieldId}',
      method: 'get',
      operationId: 'get_brand_kit_section_field_v2',
    },
    {
      path: '/api/brands/v2/organizations/{organizationId}/brandkits/{brandkitId}/sections/{sectionId}/fields/{fieldId}',
      method: 'patch',
      operationId: 'update_brand_kit_section_field_v2',
    },
  ];

  for (const rename of pathRenames) {
    const pathItem = schema.paths?.[rename.path]?.[rename.method];
    if (pathItem) {
      pathItem.operationId = rename.operationId;
    }
  }

  const schemaPath = join(tmpdir(), 'ai-brands-openapi.patched.json');
  await writeFile(schemaPath, JSON.stringify(schema, null, 2), 'utf8');

  return schemaPath;
}

async function generate() {
  await createClient({
    input: 'https://ai-skills-api-euw.sitecorecloud.io/openapi.json',
    output: {
      format: 'prettier',
      lint: 'eslint',
      path: './src/experimental/client-skills',
    },
    plugins: [
      defineSchemaPatcherConfig({
        basePath: '/stream/ai-skills-api/',
      }),
      '@hey-api/client-fetch',
      '@hey-api/schemas',
      '@hey-api/sdk',
      {
        enums: 'javascript',
        name: '@hey-api/typescript',
      },
      defineNamespaceTransformerConfig({
        namespace: 'experimental_Skills',
      }),
    ],
  });

  const brandsSchemaPath = await createPatchedBrandsSchemaPath();

  await createClient({
    input: brandsSchemaPath,
    output: {
      format: 'prettier',
      lint: 'eslint',
      path: './src/experimental/client-brands',
    },
    plugins: [
      defineSchemaPatcherConfig({
        basePath: '/ai-brands-api',
      }),
      '@hey-api/client-fetch',
      '@hey-api/schemas',
      '@hey-api/sdk',
      {
        enums: 'javascript',
        name: '@hey-api/typescript',
      },
      defineNamespaceTransformerConfig({
        namespace: 'experimental_Brands',
      }),
    ],
  });
}

generate();
