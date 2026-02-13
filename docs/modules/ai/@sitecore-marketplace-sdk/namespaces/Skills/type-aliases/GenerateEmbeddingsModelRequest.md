[**@sitecore-marketplace-sdk/ai**](../../../../README.md)

***

[@sitecore-marketplace-sdk/ai](../../../../README.md) / [Skills](../README.md) / GenerateEmbeddingsModelRequest

# Type Alias: GenerateEmbeddingsModelRequest

> **GenerateEmbeddingsModelRequest** = `object`

Defined in: [packages/ai/src/client-skills/types.gen.ts:119](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/types.gen.ts#L119)

## Properties

### input

> **input**: [`InputItem`](InputItem.md)[]

Defined in: [packages/ai/src/client-skills/types.gen.ts:123](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/types.gen.ts#L123)

List of content items for vectorization

***

### models?

> `optional` **models**: [`LlmModel`](LlmModel.md) \| `null`

Defined in: [packages/ai/src/client-skills/types.gen.ts:127](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/types.gen.ts#L127)

The global models field overrides the default Large Language Models (LLMs) defined for creating embeddings for specific content types
