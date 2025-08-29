[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / PageLocking

# Type Alias: PageLocking

> **PageLocking** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:296](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L296)

## Properties

### canUnlock?

> `optional` **canUnlock**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:301](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L301)

Whether the current user can unlock the page for editing.
Example value: False

***

### isLocked?

> `optional` **isLocked**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:306](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L306)

Whether the page is currently locked for editing.
Example value: False

***

### lockedBy?

> `optional` **lockedBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:311](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L311)

If the page is locked, the user who locked it.
Example value: john.smith@skate-park.com

***

### lockedByCurrentUser?

> `optional` **lockedByCurrentUser**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:316](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L316)

Whether the page was locked by the current user.
Example value: False
