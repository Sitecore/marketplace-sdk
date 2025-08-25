[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / WorkflowStatistics

# Type Alias: WorkflowStatistics

> **WorkflowStatistics** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1458](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1458)

Represents the workflow statistics.

## Properties

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1463](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1463)

The name of the workflow.
Example value: Sample Workflow

***

### states?

> `optional` **states**: [`WorkflowStateStatistics`](WorkflowStateStatistics.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1467](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1467)

A collection of states defined for the workflow, and the number of pages in each state.
