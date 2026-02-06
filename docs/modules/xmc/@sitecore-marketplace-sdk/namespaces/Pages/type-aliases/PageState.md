[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Pages](../README.md) / PageState

# Type Alias: PageState

> **PageState** = `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:371](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L371)

## Properties

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:381](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L381)

The display name of the page.
Example value: Site Home

***

### finalLayout?

> `optional` **finalLayout**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:396](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L396)

The final layout of the page.
Example value: {\"devices\":[{\"id\":\"fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3\",\"layoutId\":\"96e5f4ba-a2cf-4a4c-a4e7-64da88226362\",\"placeholders\":[],\"renderings\":[{\"id\":\"9c6d53e3-fe57-4638-af7b-6d68304c7a94\",\"instanceId\":\"ad5e15fb-896b-4415-8735-5e4d6b1543e1\",\"placeholderKey\":\"headless-main\",\"dataSource\":\"local:/Data/Text 1\",\"parameters\":{\"GridParameters\":\"{7465D855-992E-4DC2-9855-A03250DFA74B}\",\"FieldNames\":\"{940B57D1-13EA-429D-8C7E-2F6C1307B1B1}\",\"Styles\":\"\",\"RenderingIdentifier\":\"\",\"CSSStyles\":\"\",\"DynamicPlaceholderId\":\"1\"}}]}]}

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:376](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L376)

The page identifier.
Example value: 8f0b81bc-7388-46be-b109-6e73d1114470

***

### layoutEditingKind?

> `optional` **layoutEditingKind**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:406](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L406)

The kind of layout for editing (Shared of Final).
Example value: Final

***

### revision?

> `optional` **revision**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:386](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L386)

The revision of the page.
Example value: f7d29433-001e-4a35-a744-876759dba468

***

### sharedLayout?

> `optional` **sharedLayout**: `string` \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:401](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L401)

The shared layout of the page.
Example value: {\"devices\":[{\"id\":\"fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3\",\"layoutId\":\"96e5f4ba-a2cf-4a4c-a4e7-64da88226362\",\"placeholders\":[],\"renderings\":[]}]}

***

### versions?

> `optional` **versions**: [`Page`](Page.md)[] \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:391](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L391)

The versions of the page.

***

### workflow?

> `optional` **workflow**: [`PageWorkflow`](PageWorkflow.md)

Defined in: [packages/xmc/src/client-pages/types.gen.ts:387](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L387)
