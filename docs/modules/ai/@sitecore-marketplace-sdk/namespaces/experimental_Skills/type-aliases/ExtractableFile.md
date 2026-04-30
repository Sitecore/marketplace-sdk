[**@sitecore-marketplace-sdk/ai**](../../../../README.md)

***

[@sitecore-marketplace-sdk/ai](../../../../README.md) / [experimental\_Skills](../README.md) / ExtractableFile

# Type Alias: ExtractableFile

> **ExtractableFile** = `object`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L51)

Model for files (documents, images) to be processed/analyzed for brand review.

## Properties

### auth?

> `optional` **auth**: [`AuthenticationType`](AuthenticationType.md) \| `null`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:75](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L75)

Authentication details for accessing the file (not needed for base64)

***

### detail?

> `optional` **detail**: `"low"` \| `"auto"` \| `"high"` \| `null`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:71](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L71)

Level of processing detail

***

### mimeType

> **mimeType**: [`DocumentMimeType`](DocumentMimeType.md) \| [`ImageMimeType`](ImageMimeType.md)

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:67](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L67)

MIME type of the file

***

### name

> **name**: `string`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:55](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L55)

Name of the file

***

### type

> **type**: `"document"` \| `"image"`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:59](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L59)

Type of the file

***

### url

> **url**: `string`

Defined in: [packages/ai/src/experimental/client-skills/types.gen.ts:63](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/experimental/client-skills/types.gen.ts#L63)

URL where the file can be downloaded or base64 encoded data
