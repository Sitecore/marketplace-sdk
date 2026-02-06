[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / Page

# Type Alias: Page

> **Page** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:128](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L128)

## Properties

### createdAt?

> `optional` **createdAt**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:153](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L153)

The date the page was created.
Example value: 2025-01-27T10:33:33Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L163)

The user who created the page.
Example value: john.doe@sitecore.com

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:201](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L201)

The page's display name.
Example value: Site Home

***

### finalLayout?

> `optional` **finalLayout**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:176](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L176)

The final layout of the page.
Example value: {\"devices\":[{\"id\":\"fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3\",\"layoutId\":\"96e5f4ba-a2cf-4a4c-a4e7-64da88226362\",\"placeholders\":[],\"renderings\":[{\"id\":\"9c6d53e3-fe57-4638-af7b-6d68304c7a94\",\"instanceId\":\"ad5e15fb-896b-4415-8735-5e4d6b1543e1\",\"placeholderKey\":\"headless-main\",\"dataSource\":\"local:/Data/Text 1\",\"parameters\":{\"GridParameters\":\"{7465D855-992E-4DC2-9855-A03250DFA74B}\",\"FieldNames\":\"{940B57D1-13EA-429D-8C7E-2F6C1307B1B1}\",\"Styles\":\"\",\"RenderingIdentifier\":\"\",\"CSSStyles\":\"\",\"DynamicPlaceholderId\":\"1\"}}]}]}

***

### hasChildren?

> `optional` **hasChildren**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:231](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L231)

Whether the page has any child pages.
Example value: True

***

### hasPresentation?

> `optional` **hasPresentation**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:226](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L226)

If set to true, this page can be rendered in the SitecoreAI Pages application. This value is automatically set to false for the root item of the site, as well as for the folders if there are any.
Example value: True

***

### icon?

> `optional` **icon**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:138](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L138)

Path to the icon associated with the page.
Example value: Applications/32x32/document_heart.png

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:191](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L191)

The page identifier.
Example value: 68900348a3b84eb8ac7df4d179c25727

***

### isLatestPublishableVersion?

> `optional` **isLatestPublishableVersion**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:236](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L236)

Whether the page version is latest publishable version
Example value: True

***

### language?

> `optional` **language**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:206](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L206)

The page language.
Example value: en-US

***

### layoutEditingKind?

> `optional` **layoutEditingKind**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:186](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L186)

The type of layout for editing (Shared of Final).
Example value: Final

***

### locking?

> `optional` **locking**: [`PageLocking`](PageLocking.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:238](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L238)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:196](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L196)

The page's system name.
Example value: Home

***

### parentId?

> `optional` **parentId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:221](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L221)

The identifier of the page's parent.
Example value: 4bc0c81a280b4b13890b7b074b9d68f4

***

### path?

> `optional` **path**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:243](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L243)

The path for the page.
Example value: Sitecore/Content/Home/Categories/Products/MyProduct

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:237](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L237)

***

### publishing?

> `optional` **publishing**: [`Publishing`](Publishing.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:171](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L171)

***

### revision?

> `optional` **revision**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:148](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L148)

The revision of the page.
Example value: f7d29433-001e-4a35-a744-876759dba468

***

### route?

> `optional` **route**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:248](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L248)

The public-facing URL path relative to the site's root.
Example value: /Aboutus

***

### sharedLayout?

> `optional` **sharedLayout**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:181](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L181)

The shared layout of the page.
Example value: {\"devices\":[{\"id\":\"fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3\",\"layoutId\":\"96e5f4ba-a2cf-4a4c-a4e7-64da88226362\",\"placeholders\":[],\"renderings\":[]}]}

***

### template?

> `optional` **template**: [`PageTemplate`](PageTemplate.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:169](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L169)

***

### templateId?

> `optional` **templateId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:216](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L216)

The identifier of the template this page is based on.
Example value: 6fe7d6551e3d4c2780105777f06c6c4f

***

### updatedAt?

> `optional` **updatedAt**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:158](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L158)

The date the page was last updated.
Example value: 2025-01-27T10:39:02Z

***

### updatedBy?

> `optional` **updatedBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:168](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L168)

The user who last updated the page.
Example value: john.doe@sitecore.com

***

### url?

> `optional` **url**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:133](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L133)

The page URL path.
Example value: /about

***

### version?

> `optional` **version**: `number`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:211](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L211)

The current version of the page.
Example value: 1

***

### versionName?

> `optional` **versionName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:143](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L143)

The name of the page version.
Example value: Black Friday content update

***

### workflow?

> `optional` **workflow**: [`PageWorkflow`](PageWorkflow.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:170](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L170)
