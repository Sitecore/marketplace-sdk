[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / PageWorkflow

# Type Alias: PageWorkflow

> **PageWorkflow** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:482](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L482)

## Properties

### canEdit?

> `optional` **canEdit**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:502](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L502)

Whether the page can be edited.
Example value: True

***

### commands?

> `optional` **commands**: [`WorkflowCommand`](WorkflowCommand.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:515](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L515)

The list of commands available in the current workflow state.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:492](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L492)

The display name of the workflow.
Example value: Page Workflow

***

### finalState?

> `optional` **finalState**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:497](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L497)

Whether the page is in the final workflow state.
Example value: True

***

### icon?

> `optional` **icon**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:511](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L511)

Path to the icon associated with the workflow.
Example value: Applications/32x32/document_heart.png

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:487](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L487)

The identifier of the workflow state.
Example value: 77ac7ce9-803a-42e3-bb05-f79fca73cbce

***

### warnings?

> `optional` **warnings**: [`WorkflowWarning`](WorkflowWarning.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:506](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L506)

The list of warnings associated with the workflow.
