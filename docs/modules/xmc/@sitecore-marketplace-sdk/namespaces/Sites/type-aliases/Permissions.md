[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / Permissions

# Type Alias: Permissions

> **Permissions** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:838](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L838)

The access rights of the current user to the site.

## Properties

### canAdmin?

> `optional` **canAdmin**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:843](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L843)

Whether the current user has admin rights. Being an admin means that you control access permissions for other users, and have full read and write rights.
Example value: False

***

### canCreate?

> `optional` **canCreate**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:853](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L853)

Whether the current user has permission to create entities.
Example value: False

***

### canDelete?

> `optional` **canDelete**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:858](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L858)

Whether the current user has permission to delete entities.
Example value: False

***

### canDuplicate?

> `optional` **canDuplicate**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:878](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L878)

Whether the current user has permission to duplicate entities.
Example value: False

***

### canPublish?

> `optional` **canPublish**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:873](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L873)

Whether the current user has permission to publish sites in this environment.
Example value: False

***

### canRead?

> `optional` **canRead**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:868](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L868)

Whether the current user has permission to see entities, including all their parameters.
Example value: False

***

### canRename?

> `optional` **canRename**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:863](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L863)

Whether the current user has permission to rename entities.
Example value: False

***

### canWrite?

> `optional` **canWrite**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:848](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L848)

Whether the current user has permissions to edit values. Users with write access also have read access.
Example value: False

***

### canWriteLanguage?

> `optional` **canWriteLanguage**: `boolean`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:883](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L883)

Whether the current user has permission to write item language entities.
Example value: False
