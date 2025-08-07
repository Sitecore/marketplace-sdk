[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / ApplicationRuntimeContext

# Interface: ApplicationRuntimeContext

Defined in: [packages/core/src/shared-types.ts:161](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L161)

Represents the runtime context of an application.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### application

> **application**: `object`

Defined in: [packages/core/src/shared-types.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L163)

#### Index Signature

\[`key`: `string`\]: `any`

#### iconUrl?

> `optional` **iconUrl**: `string`

#### id

> **id**: `string`

#### name

> **name**: `string`

#### state

> **state**: `string`

#### type

> **type**: `string`

#### url

> **url**: `string`

***

### extensionsPoints?

> `optional` **extensionsPoints**: [`ApplicationTouchpointContext`](ApplicationTouchpointContext.md)[]

Defined in: [packages/core/src/shared-types.ts:177](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L177)

***

### installationId

> **installationId**: `string`

Defined in: [packages/core/src/shared-types.ts:162](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L162)

***

### resourceAccess?

> `optional` **resourceAccess**: [`ApplicationResourceContext`](ApplicationResourceContext.md)[]

Defined in: [packages/core/src/shared-types.ts:176](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L176)

***

### ~~resources~~

> **resources**: [`ApplicationResourceContext`](ApplicationResourceContext.md)[]

Defined in: [packages/core/src/shared-types.ts:173](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L173)

#### Deprecated

Use resourceAccess instead

***

### ~~touchpoints~~

> **touchpoints**: [`ApplicationTouchpointContext`](ApplicationTouchpointContext.md)[]

Defined in: [packages/core/src/shared-types.ts:175](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/shared-types.ts#L175)

#### Deprecated

Use extensionsPoints instead
