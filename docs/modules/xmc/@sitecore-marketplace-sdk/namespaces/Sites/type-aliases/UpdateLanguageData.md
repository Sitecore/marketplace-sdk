[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / UpdateLanguageData

# Type Alias: UpdateLanguageData

> **UpdateLanguageData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2469](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2469)

## Properties

### body

> **body**: [`EditLanguageInput`](EditLanguageInput.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2473](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2473)

Input parameters

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2474](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2474)

#### isoCode

> **isoCode**: `string`

Regional ISO code of the language to update

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2480](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2480)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/languages/{isoCode}"`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2490](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2490)
