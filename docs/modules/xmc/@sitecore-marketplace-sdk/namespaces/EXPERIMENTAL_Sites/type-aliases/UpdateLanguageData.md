[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / UpdateLanguageData

# Type Alias: UpdateLanguageData

> **UpdateLanguageData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2124](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2124)

## Properties

### body

> **body**: [`EditLanguageInput`](EditLanguageInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2128](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2128)

Input parameters

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2129](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2129)

#### isoCode

> **isoCode**: `string`

Regional ISO code of the language to update

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2135](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2135)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/languages/{isoCode}"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2145](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2145)
