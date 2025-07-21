[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / RetrieveJobData

# Type Alias: RetrieveJobData

> **RetrieveJobData** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1807](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L1807)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1808](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L1808)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1809](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L1809)

#### jobHandle

> **jobHandle**: `string`

The handle of the job. If you don’t know the handle of the job, first retrieve the list of site job statuses.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1815](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L1815)

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/jobs/{jobHandle}/status"`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1821](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L1821)
