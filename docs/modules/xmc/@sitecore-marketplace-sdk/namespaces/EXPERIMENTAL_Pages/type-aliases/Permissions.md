[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / Permissions

# Type Alias: Permissions

> **Permissions** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:503](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L503)

The access rights of the current user to the site.

## Properties

### canAdmin?

> `optional` **canAdmin**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:508](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L508)

Whether the current user has admin rights. Being an admin means that you control access permissions for other users, and have full read and write rights.
Example value: False

***

### canCreate?

> `optional` **canCreate**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:518](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L518)

Whether the current user has permission to create entities.
Example value: False

***

### canDelete?

> `optional` **canDelete**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:523](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L523)

Whether the current user has permission to delete entities.
Example value: False

***

### canDuplicate?

> `optional` **canDuplicate**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:543](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L543)

Whether the current user has permission to duplicate entities.
Example value: False

***

### canPublish?

> `optional` **canPublish**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:538](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L538)

Whether the current user has permission to publish sites in this environment.
Example value: False

***

### canRead?

> `optional` **canRead**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:533](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L533)

Whether the current user has permission to see entities, including all their parameters.
Example value: False

***

### canRename?

> `optional` **canRename**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:528](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L528)

Whether the current user has permission to rename entities.
Example value: False

***

### canWrite?

> `optional` **canWrite**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:513](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L513)

Whether the current user has permissions to edit values. Users with write access also have read access.
Example value: False

***

### canWriteLanguage?

> `optional` **canWriteLanguage**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:548](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L548)

Whether the current user has permission to write item language entities.
Example value: False
