[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / PageWorkflow

# Type Alias: PageWorkflow

> **PageWorkflow** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:451](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L451)

## Properties

### canEdit?

> `optional` **canEdit**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:471](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L471)

Whether the page can be edited.
Example value: True

***

### commands?

> `optional` **commands**: [`WorkflowCommand`](WorkflowCommand.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:484](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L484)

The list of commands available in the current workflow state.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:461](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L461)

The display name of the workflow.
Example value: Page Workflow

***

### finalState?

> `optional` **finalState**: `boolean`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:466](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L466)

Whether the page is in the final workflow state.
Example value: True

***

### icon?

> `optional` **icon**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:480](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L480)

Path to the icon associated with the workflow.
Example value: Applications/32x32/document_heart.png

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:456](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L456)

The identifier of the workflow state.
Example value: 77ac7ce9-803a-42e3-bb05-f79fca73cbce

***

### warnings?

> `optional` **warnings**: [`WorkflowWarning`](WorkflowWarning.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:475](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L475)

The list of warnings associated with the workflow.
