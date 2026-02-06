[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / SavePageResult

# Type Alias: SavePageResult

> **SavePageResult** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:712](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L712)

## Properties

### errors?

> `optional` **errors**: [`SavePageError`](SavePageError.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:716](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L716)

The list of errors that occurred during the save operation.

***

### newCreatedVersion?

> `optional` **newCreatedVersion**: [`PageVersionInfo`](PageVersionInfo.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:726](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L726)

***

### savedPage?

> `optional` **savedPage**: [`SavedPage`](SavedPage.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:717](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L717)

***

### validationErrors?

> `optional` **validationErrors**: [`PageValidationError`](PageValidationError.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:721](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L721)

The list of validation errors that occurred during the save operation.

***

### warnings?

> `optional` **warnings**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:725](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L725)

The list of warnings that occurred during the save operation.
