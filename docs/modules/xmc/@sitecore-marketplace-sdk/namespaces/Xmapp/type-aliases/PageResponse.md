[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / PageResponse

# Type Alias: PageResponse

> **PageResponse** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:626](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L626)

## Properties

### children?

> `optional` **children**: `PageResponse`[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:638](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L638)

Children of the page.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:653](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L653)

The page's display name.
Example value: Site Home

***

### hasChildren?

> `optional` **hasChildren**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:683](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L683)

Whether the page has any child pages.
Example value: True

***

### hasPresentation?

> `optional` **hasPresentation**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:678](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L678)

If set to true, this page can be rendered in the XM Cloud Pages application. This endpoint is set to false for the root item of the site, as well as for the folders if there are any.
Example value: True

***

### hasVersions?

> `optional` **hasVersions**: `boolean`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:634](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L634)

Indicates whether the page has versions in the queried language.

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:643](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L643)

The identifier of the page.
Example value: 68900348a3b84eb8ac7df4d179c25727

***

### insertOptions?

> `optional` **insertOptions**: [`PageInsertOption`](PageInsertOption.md)[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:630](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L630)

Insert options for the page.

***

### language?

> `optional` **language**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:658](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L658)

The page language.
Example value: en-US

***

### locking?

> `optional` **locking**: [`PageLocking`](PageLocking.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:685](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L685)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:648](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L648)

The page's system name.
Example value: Home

***

### parentId?

> `optional` **parentId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:673](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L673)

The identifier of the page's parent.
Example value: 4bc0c81a280b4b13890b7b074b9d68f4

***

### path?

> `optional` **path**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:690](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L690)

The path for the page.
Example value: Sitecore/Content/Home/Categories/Products/MyProduct

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:684](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L684)

***

### templateId?

> `optional` **templateId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:668](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L668)

The identifier of the template this page is based on.
Example value: 6fe7d6551e3d4c2780105777f06c6c4f

***

### version?

> `optional` **version**: `number`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:663](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L663)

The current version of the page.
Example value: 1
