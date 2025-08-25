[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / Language

# Type Alias: Language

> **Language** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:385](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L385)

Language

## Properties

### baseIsoCultureCode?

> `optional` **baseIsoCultureCode**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:431](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L431)

Base ISO culture code. If this is a custom language, this ISO culture code will represent the language code used as the base of this language.
For example, if the custom language uses the same writing system, calendar, and date format as American English, the value would be 'en-US'.
Example value: en-US

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:415](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L415)

The human-readable name of the language as it appears in the user interface, for example, "English" or "Español."
Example value: English (United States) : English (United States)

***

### englishName?

> `optional` **englishName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:425](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L425)

The language name in English, regardless of the language being described. For example, "Deutsch" would be displayed as "German."
Example value: English (United States)

***

### fallbackLanguageIso?

> `optional` **fallbackLanguageIso**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:405](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L405)

The ISO code of the fallback language
Example value: en

***

### fallbackRegionDisplayName?

> `optional` **fallbackRegionDisplayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:436](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L436)

If this is a custom language, the Fallback Region Display Name respresents the region name that should be displayed.
Example value: North America

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:390](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L390)

The identifier of the language.
Example value: af58419145c9420187405409f4cf8bdd

***

### iso?

> `optional` **iso**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:395](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L395)

The ISO code of the language.
Example value: en

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:410](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L410)

The ISO language code (e.g., "en" for English, "es" for Spanish).
Example value: en-US

***

### nativeName?

> `optional` **nativeName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:420](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L420)

The language name in its original script or characters. For instance, "English" would be displayed as "English" itself, but "日本語" would appear as "日本語."
Example value: English (United States)

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:437](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L437)

***

### regionalIsoCode?

> `optional` **regionalIsoCode**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:400](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L400)

The regional ISO code of the language, for example, US for the USA, or DK for Denmark.
Example value: en-US
