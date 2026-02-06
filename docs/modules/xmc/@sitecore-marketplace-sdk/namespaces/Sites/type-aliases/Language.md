[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / Language

# Type Alias: Language

> **Language** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:456](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L456)

Language

## Properties

### baseIsoCultureCode?

> `optional` **baseIsoCultureCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:502](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L502)

Base ISO culture code. If this is a custom language, this ISO culture code will represent the language code used as the base of this language.
For example, if the custom language uses the same writing system, calendar, and date format as American English, the value would be 'en-US'.
Example value: en-US

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:486](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L486)

The human-readable name of the language as it appears in the user interface, for example, "English" or "Español."
Example value: English (United States) : English (United States)

***

### englishName?

> `optional` **englishName**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:496](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L496)

The language name in English, regardless of the language being described. For example, "Deutsch" would be displayed as "German."
Example value: English (United States)

***

### fallbackLanguageIso?

> `optional` **fallbackLanguageIso**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:476](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L476)

The ISO code of the fallback language
Example value: en

***

### fallbackRegionDisplayName?

> `optional` **fallbackRegionDisplayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:507](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L507)

If this is a custom language, the Fallback Region Display Name respresents the region name that should be displayed.
Example value: North America

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:461](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L461)

The identifier of the language.
Example value: af58419145c9420187405409f4cf8bdd

***

### iso?

> `optional` **iso**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:466](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L466)

The ISO code of the language.
Example value: en

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:481](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L481)

The ISO language code (e.g., "en" for English, "es" for Spanish).
Example value: en-US

***

### nativeName?

> `optional` **nativeName**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:491](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L491)

The language name in its original script or characters. For instance, "English" would be displayed as "English" itself, but "日本語" would appear as "日本語."
Example value: English (United States)

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:508](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L508)

***

### regionalIsoCode?

> `optional` **regionalIsoCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:471](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L471)

The regional ISO code of the language, for example, US for the USA, or DK for Denmark.
Example value: en-US
