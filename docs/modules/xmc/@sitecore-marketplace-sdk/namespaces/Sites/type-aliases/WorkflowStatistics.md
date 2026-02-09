[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / WorkflowStatistics

# Type Alias: WorkflowStatistics

> **WorkflowStatistics** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1604](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1604)

Represents the workflow statistics.

## Properties

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1609](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1609)

The name of the workflow.
Example value: Sample Workflow

***

### states?

> `optional` **states**: [`WorkflowStateStatistics`](WorkflowStateStatistics.md)[] \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1613](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1613)

A collection of states defined for the workflow, and the number of pages in each state.
