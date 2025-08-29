[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / SavePageResult

# Type Alias: SavePageResult

> **SavePageResult** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:681](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L681)

## Properties

### errors?

> `optional` **errors**: [`SavePageError`](SavePageError.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:685](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L685)

The list of errors that occurred during the save operation.

***

### newCreatedVersion?

> `optional` **newCreatedVersion**: [`PageVersionInfo`](PageVersionInfo.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:695](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L695)

***

### savedPage?

> `optional` **savedPage**: [`SavedPage`](SavedPage.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:686](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L686)

***

### validationErrors?

> `optional` **validationErrors**: [`PageValidationError`](PageValidationError.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:690](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L690)

The list of validation errors that occurred during the save operation.

***

### warnings?

> `optional` **warnings**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:694](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L694)

The list of warnings that occurred during the save operation.
