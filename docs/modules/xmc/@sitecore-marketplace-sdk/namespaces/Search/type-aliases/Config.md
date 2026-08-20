[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Search](../README.md) / Config

# Type Alias: Config

> **Config** = `object`

Defined in: [packages/xmc/src/client-search/types.gen.ts:4](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L4)

## Properties

### connections?

> `optional` **connections?**: [`Connection`](Connection.md)[]

Defined in: [packages/xmc/src/client-search/types.gen.ts:5](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L5)

***

### context?

> `optional` **context?**: `object`

Defined in: [packages/xmc/src/client-search/types.gen.ts:6](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L6)

#### Index Signature

\[`key`: `string`\]: `string`

***

### createdAt

> **createdAt**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L9)

***

### createdBy?

> `optional` **createdBy?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:10](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L10)

***

### deletedAt?

> `optional` **deletedAt?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:11](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L11)

***

### deletedBy?

> `optional` **deletedBy?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:12](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L12)

***

### description

> **description**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L13)

***

### fields

> **fields**: [`Field`](Field.md)[]

Defined in: [packages/xmc/src/client-search/types.gen.ts:14](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L14)

***

### hasDraft?

> `optional` **hasDraft?**: `boolean`

Defined in: [packages/xmc/src/client-search/types.gen.ts:15](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L15)

***

### id

> **id**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L16)

***

### locales?

> `optional` **locales?**: `string`[]

Defined in: [packages/xmc/src/client-search/types.gen.ts:22](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L22)

The SitecoreAI locale.

Example values: ["en", "en-US", "el-GR"]

***

### name

> **name**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L23)

***

### publishedAt?

> `optional` **publishedAt?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:24](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L24)

***

### publishedBy?

> `optional` **publishedBy?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:25](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L25)

***

### schedule?

> `optional` **schedule?**: [`Schedule`](Schedule.md)

Defined in: [packages/xmc/src/client-search/types.gen.ts:26](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L26)

***

### searchClientKey

> **searchClientKey**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:27](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L27)

***

### searchSettings?

> `optional` **searchSettings?**: [`SearchSettings`](SearchSettings.md)

Defined in: [packages/xmc/src/client-search/types.gen.ts:28](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L28)

***

### sourceType?

> `optional` **sourceType?**: `"content"` \| `"site"` \| `"push"`

Defined in: [packages/xmc/src/client-search/types.gen.ts:33](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L33)

Allowed values: content (XMC pull), site (crawl/pull), push (API push as system of record).
Empty defaults to content.

***

### status?

> `optional` **status?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:34](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L34)

***

### suggestion?

> `optional` **suggestion?**: [`SuggestionSettings`](SuggestionSettings.md)

Defined in: [packages/xmc/src/client-search/types.gen.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L35)

***

### templateId?

> `optional` **templateId?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L39)

TemplateId is required for content sources only

***

### tenantId

> **tenantId**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:40](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L40)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L41)

***

### updatedBy?

> `optional` **updatedBy?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:42](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L42)

***

### versionNumber?

> `optional` **versionNumber?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L43)
