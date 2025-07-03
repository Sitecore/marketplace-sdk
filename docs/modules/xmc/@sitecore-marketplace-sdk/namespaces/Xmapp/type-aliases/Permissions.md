[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / Permissions

# Type Alias: Permissions

> **Permissions** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:724](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L724)

The access rights of the current user to the site.

## Properties

### canAdmin?

> `optional` **canAdmin**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:729](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L729)

If set to true, canAdmin gives you admin rights. Being an admin means that you control access permissions for other users. The Administer access right requires Read and Write access rights.
Example value: False

***

### canCreate?

> `optional` **canCreate**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:739](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L739)

If set to true, canCreate gives you permission to create entities.
Example value: False

***

### canDelete?

> `optional` **canDelete**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:744](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L744)

If set to true, canDelete gives you permission to delete entities.
Example value: False

***

### canDuplicate?

> `optional` **canDuplicate**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:764](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L764)

If set to true, canDuplicate gives you permission to duplicate entities.
Example value: False

***

### canPublish?

> `optional` **canPublish**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:759](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L759)

If set to true, canPublish gives you permission to publish sites in this environment.
Example value: False

***

### canRead?

> `optional` **canRead**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:754](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L754)

If set to true, canRead gives you permission to see entities, including all their parameters.
Example value: False

***

### canRename?

> `optional` **canRename**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:749](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L749)

If set to true, canRename gives you permission to rename entities.
Example value: False

***

### canWrite?

> `optional` **canWrite**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:734](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L734)

If set to true, canWrite gives you permission to edit values. The canWrite access right requires the canRead access right.
Example value: False
