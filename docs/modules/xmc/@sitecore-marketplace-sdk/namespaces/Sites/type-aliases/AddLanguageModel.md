[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / AddLanguageModel

# Type Alias: AddLanguageModel

> **AddLanguageModel** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:24](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L24)

## Properties

### charset?

> `optional` **charset**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:29](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L29)

The character encoding, that specifies how characters are represented in a document or web page.
Example value: iso-8859-1

***

### codePage?

> `optional` **codePage**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:34](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L34)

Code Page
Example value: 65001

***

### customCode?

> `optional` **customCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L39)

If you wish to support a nonstandard country or region code, you can provide a custom language code.
Example value: en-EU

***

### database?

> `optional` **database**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L44)

Database
Example value: master

***

### encoding?

> `optional` **encoding**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:49](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L49)

Encoding
Example value: utf-8

***

### fallbackLanguage?

> `optional` **fallbackLanguage**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:69](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L69)

If you wish to configure fallback for the new language, add the ISO language code for the fallback language.
Example value: en

***

### languageCode

> **languageCode**: `string`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:54](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L54)

The ISO code for the language.
Example value: en

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:59](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L59)

The name that will be used for the language.
Example value: en-US

***

### regionCode?

> `optional` **regionCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:64](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L64)

The regional ISO code of the language. Example values: US for the USA, or DK for Denmark.
Example value: US

***

### spellChecker?

> `optional` **spellChecker**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:74](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L74)

A reference to the dictionary file name that you want to use to spellcheck in the new language.
Example value: en-US.tdf
