[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / CreateEditorProfileInput

# Type Alias: CreateEditorProfileInput

> **CreateEditorProfileInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:140](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L140)

The profile creation request input

## Properties

### name

> **name**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:145](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L145)

The profile name
Example value: Basic Editing

***

### value

> **value**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:150](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L150)

The editor toolbar profile configuration
Example value: {"toolbar":{"items":["bold","italic","emphasis","underline","blockQuote",{"label":"Formatting","icon":"text","items":["strikethrough","subscript","superscript","|","removeFormat"]},"fontColor","fontBackgroundColor","|","heading","|","alignment","bulletedList","numberedList","|","outdent","indent","|","link","internalLink","phoneLink","|",{"label":"Insert","withText":false,"icon":"plus","items":["sitecoreSelectMedia","insertTable","horizontalLine"]},"|","sourceEditing","|","sitecoreResetFieldValue"]}}
