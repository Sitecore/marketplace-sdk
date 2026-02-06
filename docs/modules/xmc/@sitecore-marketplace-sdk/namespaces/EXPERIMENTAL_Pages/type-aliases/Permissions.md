[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / Permissions

# Type Alias: Permissions

> **Permissions** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:534](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L534)

The access rights of the current user to the site.

## Properties

### canAdmin?

> `optional` **canAdmin**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:539](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L539)

Whether the current user has admin rights. Being an admin means that you control access permissions for other users, and have full read and write rights.
Example value: False

***

### canCreate?

> `optional` **canCreate**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:549](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L549)

Whether the current user has permission to create entities.
Example value: False

***

### canDelete?

> `optional` **canDelete**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:554](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L554)

Whether the current user has permission to delete entities.
Example value: False

***

### canDuplicate?

> `optional` **canDuplicate**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:574](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L574)

Whether the current user has permission to duplicate entities.
Example value: False

***

### canPublish?

> `optional` **canPublish**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:569](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L569)

Whether the current user has permission to publish sites in this environment.
Example value: False

***

### canRead?

> `optional` **canRead**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:564](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L564)

Whether the current user has permission to see entities, including all their parameters.
Example value: False

***

### canRename?

> `optional` **canRename**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:559](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L559)

Whether the current user has permission to rename entities.
Example value: False

***

### canWrite?

> `optional` **canWrite**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:544](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L544)

Whether the current user has permissions to edit values. Users with write access also have read access.
Example value: False

***

### canWriteLanguage?

> `optional` **canWriteLanguage**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:579](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L579)

Whether the current user has permission to write item language entities.
Example value: False
