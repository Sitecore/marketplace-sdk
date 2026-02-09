[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Pages](../README.md) / PageLocking

# Type Alias: PageLocking

> **PageLocking** = `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:327](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L327)

## Properties

### canUnlock?

> `optional` **canUnlock**: `boolean`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:332](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L332)

Whether the current user can unlock the page for editing.
Example value: False

***

### isLocked?

> `optional` **isLocked**: `boolean`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:337](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L337)

Whether the page is currently locked for editing.
Example value: False

***

### lockedBy?

> `optional` **lockedBy**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:342](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L342)

If the page is locked, the user who locked it.
Example value: john.smith@skate-park.com

***

### lockedByCurrentUser?

> `optional` **lockedByCurrentUser**: `boolean`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:347](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L347)

Whether the page was locked by the current user.
Example value: False
