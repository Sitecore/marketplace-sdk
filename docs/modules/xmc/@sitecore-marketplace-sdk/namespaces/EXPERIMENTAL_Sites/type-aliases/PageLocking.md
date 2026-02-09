[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / PageLocking

# Type Alias: PageLocking

> **PageLocking** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:695](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L695)

## Properties

### canUnlock?

> `optional` **canUnlock**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:700](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L700)

Whether the current user can unlock the page for editing.
Example value: False

***

### isLocked?

> `optional` **isLocked**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:705](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L705)

Whether the page is currently locked for editing.
Example value: False

***

### lockedBy?

> `optional` **lockedBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:710](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L710)

If the page is locked, the user who locked it.
Example value: john.smith@skate-park.com

***

### lockedByCurrentUser?

> `optional` **lockedByCurrentUser**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:715](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L715)

Whether the page was locked by the current user.
Example value: False
