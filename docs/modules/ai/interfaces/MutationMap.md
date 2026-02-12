[**@sitecore-marketplace-sdk/ai**](../README.md)

***

[@sitecore-marketplace-sdk/ai](../README.md) / MutationMap

# Interface: MutationMap

Defined in: packages/client/dist/sdk-types.d.ts:252

## Properties

### ai.skills.generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost

> **ai.skills.generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:29](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L29)

Runs the input against the brand definition and generates a brand review leveraging a large language model (LLM). It considers the content of the brand kit sections and subsections to deliver compliance scores, explanations, and fix suggestions.

#### params

> **params**: `Options`\<[`GenerateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePostData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePostData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`GenerateBrandReviewModelResponse`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateBrandReviewModelResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: GenerateBrandReviewModelResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### ai.skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost

> **ai.skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:21](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L21)

Runs the input against the brand definition and generates a brand review leveraging a large language model (LLM). It considers the content of the brand kit sections and subsections to deliver compliance scores, explanations, and fix suggestions.

#### params

> **params**: `Options`\<[`GenerateBrandReviewApiSkillsV1BrandreviewGeneratePostData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateBrandReviewApiSkillsV1BrandreviewGeneratePostData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

***

### ai.skills.generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost

> **ai.skills.generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L45)

Generates embeddings for the provided content leveraging a large language model (LLM).

#### params

> **params**: `Options`\<[`GenerateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePostData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePostData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

***

### ai.skills.generateEmbeddingsApiSkillsV1DeepResearchGeneratePost

> **ai.skills.generateEmbeddingsApiSkillsV1DeepResearchGeneratePost**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:53](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L53)

Generates deep research content leveraging a large language model (LLM) based on the provided input and context.

#### params

> **params**: `Options`\<[`GenerateEmbeddingsApiSkillsV1DeepResearchGeneratePostData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateEmbeddingsApiSkillsV1DeepResearchGeneratePostData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

***

### ai.skills.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost

> **ai.skills.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L39)

Generates embeddings for the provided content leveraging a large language model (LLM).

#### params

> **params**: `Options`\<[`GenerateEmbeddingsApiSkillsV1EmbeddingsGeneratePostData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateEmbeddingsApiSkillsV1EmbeddingsGeneratePostData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

***

### pages.context

> **pages.context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:258

#### params

> **params**: `PagesContextParams`

#### response

> **response**: `void`

#### subscribe

> **subscribe**: `false`

***

### pages.reloadCanvas

> **pages.reloadCanvas**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:253

#### params

> **params**: `void`

#### response

> **response**: `void`

#### subscribe

> **subscribe**: `false`
