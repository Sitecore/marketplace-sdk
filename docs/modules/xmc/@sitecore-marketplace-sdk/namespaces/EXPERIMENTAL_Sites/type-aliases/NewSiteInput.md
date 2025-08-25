[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / NewSiteInput

# Type Alias: NewSiteInput

> **NewSiteInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:497](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L497)

A site creation request.

## Properties

### collectionDescription?

> `optional` **collectionDescription**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:560](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L560)

If you want to create a new site collection while creating a new site, you can provide a collection description.
Example value: Sample description for the site collection containing Sites for Brand A

***

### collectionDisplayName?

> `optional` **collectionDisplayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:555](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L555)

The display name for the collection.
Example value: Skate Park Site

***

### collectionId?

> `optional` **collectionId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:519](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L519)

The ID of the collection you want the new site to belong to. If you don't know the collection ID, first [retrieve collections](#tag/Collections/operation/Get).
Required if Sitecore.XmApps.Sites.Models.REST.NewSiteInput.CollectionName is not provided. If left empty, you must provide collectionName instead and a new collection will be created along with the newly created site.
If both collectionId and collectionName are provided, collectionName will be ignored.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### collectionName?

> `optional` **collectionName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:550](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L550)

The name of the new collection you want the new site to belong to.
Required if Sitecore.XmApps.Sites.Models.REST.NewSiteInput.CollectionId is not provided. If left empty, you must provide collectionId of an existing collection you want the new site to belong to.
If both collectionId and collectionName are provided, collectionName will be ignored.
Example value: Brand A

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:543](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L543)

Optional text that provides a meaningful description of the site.
Example value: New site for Brand A in English-speaking countries.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:507](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L507)

The display name for the site.
Example value: Skate Park Site

***

### hostName?

> `optional` **hostName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:538](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L538)

Optional hostname for the new site. Default value: *
Example value: dev.skate-park.com

***

### language

> **language**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:525](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L525)

The language for the site. If you do not know what languages are available in the environment, first [retrieve the list of languages](#tag/Languages/operation/Get).
If the language you want is not available in the environment, [add the language](#tag/Languages/operation/Create) first.
Example value: en

***

### languages?

> `optional` **languages**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:533](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L533)

The list of supported languages for the site.
Example value: [
"en",
"da"
]

***

### posMappings?

> `optional` **posMappings**: [`AnalyticsIdentifier`](AnalyticsIdentifier.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:565](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L565)

The [site identifier](https://doc.sitecore.com/xmc/en/users/xm-cloud/manage-personalization-and-analytics-for-sites.html) for the site.
This identifier lets you control analytics and personalization for the site.

***

### siteName

> **siteName**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:502](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L502)

The name of the site.
Example value: skate-park

***

### templateId

> **templateId**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:512](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L512)

The ID of the template used to create the site. If you don't know the template ID, first [retrieve site templates](#tag/Sites/operation/GetTemplates).
Example value: 5aae1eeaea2440bf96f11f43da82c77b
