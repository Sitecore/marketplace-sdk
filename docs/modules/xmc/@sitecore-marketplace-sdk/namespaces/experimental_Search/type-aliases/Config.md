[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Search](../README.md) / Config

# Type Alias: Config

> **Config** = `object`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:6](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L6)

## Properties

### connections?

> `optional` **connections?**: [`Connection`](Connection.md)[]

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:7](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L7)

***

### context?

> `optional` **context?**: `object`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:8](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L8)

#### Index Signature

\[`key`: `string`\]: `string`

***

### createdAt

> **createdAt**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:11](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L11)

***

### createdBy?

> `optional` **createdBy?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:12](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L12)

***

### deletedAt?

> `optional` **deletedAt?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L13)

***

### deletedBy?

> `optional` **deletedBy?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:14](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L14)

***

### description

> **description**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:15](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L15)

***

### fields

> **fields**: [`Field`](Field.md)[]

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L16)

***

### hasDraft?

> `optional` **hasDraft?**: `boolean`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:17](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L17)

***

### id

> **id**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:18](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L18)

***

### locales?

> `optional` **locales?**: `string`[]

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:24](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L24)

The SitecoreAI locale.

Example values: ["en", "en-US", "el-GR"]

***

### name

> **name**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:25](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L25)

***

### publishedAt?

> `optional` **publishedAt?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:26](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L26)

***

### publishedBy?

> `optional` **publishedBy?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:27](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L27)

***

### schedule?

> `optional` **schedule?**: [`Schedule`](Schedule.md)

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:28](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L28)

***

### searchClientKey

> **searchClientKey**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:29](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L29)

***

### searchSettings?

> `optional` **searchSettings?**: [`SearchSettings`](SearchSettings.md)

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L30)

***

### sourceType?

> `optional` **sourceType?**: `"content"` \| `"site"` \| `"push"`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L35)

Allowed values: content (XMC pull), site (crawl/pull), push (API push as system of record).
Empty defaults to content.

***

### status?

> `optional` **status?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:36](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L36)

***

### suggestion?

> `optional` **suggestion?**: [`SuggestionSettings`](SuggestionSettings.md)

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L37)

***

### templateId?

> `optional` **templateId?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L41)

TemplateId is required for content sources only

***

### tenantId

> **tenantId**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:42](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L42)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L43)

***

### updatedBy?

> `optional` **updatedBy?**: `string`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L44)

***

### versionNumber?

> `optional` **versionNumber?**: `number`

Defined in: [packages/xmc/src/experimental/client-search/types.gen.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-search/types.gen.ts#L45)
