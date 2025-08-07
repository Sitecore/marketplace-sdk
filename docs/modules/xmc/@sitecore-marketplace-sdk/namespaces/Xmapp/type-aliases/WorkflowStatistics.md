[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / WorkflowStatistics

# Type Alias: WorkflowStatistics

> **WorkflowStatistics** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1399](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L1399)

Represents the workflow statistics.

## Properties

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1404](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L1404)

The name of the workflow.
Example value: Sample Workflow

***

### states?

> `optional` **states**: [`WorkflowStateStatistics`](WorkflowStateStatistics.md)[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1408](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L1408)

A collection of states defined for the workflow, and the number of pages in each state.
