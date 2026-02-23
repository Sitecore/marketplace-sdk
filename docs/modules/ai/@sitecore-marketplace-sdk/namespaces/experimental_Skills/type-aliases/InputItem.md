[**@sitecore-marketplace-sdk/ai**](../../../../README.md)

***

[@sitecore-marketplace-sdk/ai](../../../../README.md) / [experimental\_Skills](../README.md) / InputItem

# Type Alias: InputItem

> **InputItem** = `object`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:138](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L138)

## Properties

### chunkSize?

> `optional` **chunkSize**: `number` \| `null`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:170](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L170)

The size of the text chunks to create embeddings for. If not provided, the default chunk size is used

***

### contentType

> **contentType**: [`ContentType`](ContentType.md)

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:150](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L150)

The type of the content to vectorize

***

### data

> **data**: `string`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:146](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L146)

The content data - URL | base64 | raw text

***

### embedImg?

> `optional` **embedImg**: `boolean`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:162](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L162)

Specifies whether to generate embeddings for all content types. If false, image embeddings (and their mean‑pooled vector) are skipped

***

### embedText?

> `optional` **embedText**: `boolean`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:166](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L166)

Specifies whether to generate embeddings for all content types. If false, text embeddings (and their mean‑pooled vector) are skipped

***

### mimeType

> **mimeType**: [`DocumentMimeType`](DocumentMimeType.md) \| [`ImageMimeType`](ImageMimeType.md)

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:154](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L154)

MIME type of the file

***

### models?

> `optional` **models**: [`LlmModel`](LlmModel.md) \| `null`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:158](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L158)

The models field overrides the default models for the particular content item

***

### name

> **name**: `string`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:142](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L142)

The name of the content item to create embedding for
