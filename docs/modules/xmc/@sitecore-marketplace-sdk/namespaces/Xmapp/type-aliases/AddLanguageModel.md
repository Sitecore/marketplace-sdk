[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / AddLanguageModel

# Type Alias: AddLanguageModel

> **AddLanguageModel** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:14](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L14)

## Properties

### charset?

> `optional` **charset**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:19](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L19)

The character encoding, that specifies how characters are represented in a document or web page.
Example value: iso-8859-1

***

### codePage?

> `optional` **codePage**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:24](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L24)

Code Page
Example value: 65001

***

### customCode?

> `optional` **customCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:29](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L29)

If you wish to support a nonstandard country or region code, you can provide a custom language code.
Example value: en-EU

***

### database?

> `optional` **database**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:34](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L34)

Database
Example value: master

***

### encoding?

> `optional` **encoding**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L39)

Example value: utf-8
Example value: utf-8

***

### fallbackLanguage?

> `optional` **fallbackLanguage**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:59](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L59)

If you wish to configure fallback for the new language, add the ISO language code for the fallback language.
Example value: en

***

### languageCode

> **languageCode**: `string`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L44)

The ISO code for the language.
Example value: en

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:49](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L49)

The name that will be used for the language.
Example value: en-US

***

### regionCode?

> `optional` **regionCode**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:54](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L54)

The regional ISO code of the language. Example values: US for the USA, or DK for Denmark.
Example value: US

***

### spellChecker?

> `optional` **spellChecker**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:64](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L64)

A reference to the dictionary file name that you want to use to spellcheck in the new language.
Example value: en-US.tdf
