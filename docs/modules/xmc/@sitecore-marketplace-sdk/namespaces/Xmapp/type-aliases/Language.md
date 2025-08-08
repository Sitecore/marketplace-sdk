[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / Language

# Type Alias: Language

> **Language** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:355](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L355)

Language

## Properties

### baseIsoCultureCode?

> `optional` **baseIsoCultureCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:401](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L401)

Base ISO culture code. If this is a custom language, this ISO culture code will represent the language code used as the base of this language.
For example, if the custom language uses the same writing system, calendar, and date format as American English, the value would be 'en-US'.
Example value: en-US

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:385](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L385)

The human-readable name of the language as it appears in the user interface, for example, "English" or "Español."
Example value: English (United States) : English (United States)

***

### englishName?

> `optional` **englishName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:395](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L395)

The language name in English, regardless of the language being described. For example, "Deutsch" would be displayed as "German."
Example value: English (United States)

***

### fallbackLanguageIso?

> `optional` **fallbackLanguageIso**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:375](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L375)

The ISO code of the fallback language
Example value: en

***

### fallbackRegionDisplayName?

> `optional` **fallbackRegionDisplayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:406](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L406)

If this is a custom language, the Fallback Region Display Name respresents the region name that should be displayed.
Example value: North America

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:360](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L360)

The identifier of the language.
Example value: af58419145c9420187405409f4cf8bdd

***

### iso?

> `optional` **iso**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:365](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L365)

The ISO code of the language.
Example value: en

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:380](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L380)

The ISO language code (e.g., "en" for English, "es" for Spanish).
Example value: en-US

***

### nativeName?

> `optional` **nativeName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:390](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L390)

The language name in its original script or characters. For instance, "English" would be displayed as "English" itself, but "日本語" would appear as "日本語."
Example value: English (United States)

***

### regionalIsoCode?

> `optional` **regionalIsoCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:370](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L370)

The regional ISO code of the language, for example, US for the USA, or DK for Denmark.
Example value: en-US
