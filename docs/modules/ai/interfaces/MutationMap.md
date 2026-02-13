[**@sitecore-marketplace-sdk/ai**](../README.md)

***

[@sitecore-marketplace-sdk/ai](../README.md) / MutationMap

# Interface: MutationMap

Defined in: packages/client/dist/sdk-types.d.ts:252

## Properties

### ai.skills.generateBrandReview

> **ai.skills.generateBrandReview**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L13)

Runs the input against the brand definition and generates a brand review leveraging a large language model (LLM). It considers the content of the brand kit sections and subsections to deliver compliance scores, explanations, and fix suggestions.

#### params

> **params**: `Options`\<[`GenerateBrandReviewData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GenerateBrandReviewData.md), `boolean`\>

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
