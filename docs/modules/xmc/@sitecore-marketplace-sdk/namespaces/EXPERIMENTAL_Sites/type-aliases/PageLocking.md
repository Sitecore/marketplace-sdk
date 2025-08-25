[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / PageLocking

# Type Alias: PageLocking

> **PageLocking** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:623](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L623)

## Properties

### canUnlock?

> `optional` **canUnlock**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:628](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L628)

Whether the current user can unlock the page for editing.
Example value: False

***

### isLocked?

> `optional` **isLocked**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:633](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L633)

Whether the page is currently locked for editing.
Example value: False

***

### lockedBy?

> `optional` **lockedBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:638](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L638)

If the page is locked, the user who locked it.
Example value: john.smith@skate-park.com

***

### lockedByCurrentUser?

> `optional` **lockedByCurrentUser**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:643](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L643)

Whether the page was locked by the current user.
Example value: False
