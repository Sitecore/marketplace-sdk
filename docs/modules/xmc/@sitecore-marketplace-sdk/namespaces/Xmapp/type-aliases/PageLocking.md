[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / PageLocking

# Type Alias: PageLocking

> **PageLocking** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:592](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L592)

## Properties

### canUnlock?

> `optional` **canUnlock**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:597](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L597)

If set to true, canUnlock gives you permission to unlock a Page entity.
Example value: False

***

### isLocked?

> `optional` **isLocked**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:602](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L602)

If set to true, isLocked denotes that the Page entity has been locked.
Example value: False

***

### lockedBy?

> `optional` **lockedBy**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:607](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L607)

If the Page entity is locked, lockedBy provides information about which user locked the entity.
Example value: john.smith@skate-park.com

***

### lockedByCurrentUser?

> `optional` **lockedByCurrentUser**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:612](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L612)

If set to true, lockedByCurrentUser denotes whether the Page entity was locked by the currently authenticated user.
Example value: False
