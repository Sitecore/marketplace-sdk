[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / ApplicationRuntimeContext

# Interface: ApplicationRuntimeContext

Defined in: [packages/core/src/shared-types.ts:187](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L187)

Represents the runtime context of an application.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### application

> **application**: `object`

Defined in: [packages/core/src/shared-types.ts:189](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L189)

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

### extensionPoints?

> `optional` **extensionPoints**: [`ApplicationExtensionPointContext`](ApplicationExtensionPointContext.md)[]

Defined in: [packages/core/src/shared-types.ts:203](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L203)

***

### installationId

> **installationId**: `string`

Defined in: [packages/core/src/shared-types.ts:188](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L188)

***

### resourceAccess?

> `optional` **resourceAccess**: [`ApplicationResourceContext`](ApplicationResourceContext.md)[]

Defined in: [packages/core/src/shared-types.ts:202](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L202)

***

### ~~resources?~~

> `optional` **resources**: [`ApplicationResourceContext`](ApplicationResourceContext.md)[]

Defined in: [packages/core/src/shared-types.ts:199](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L199)

#### Deprecated

Use resourceAccess instead

***

### ~~touchpoints?~~

> `optional` **touchpoints**: [`ApplicationTouchpointContext`](ApplicationTouchpointContext.md)[]

Defined in: [packages/core/src/shared-types.ts:201](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L201)

#### Deprecated

Use extensionPoints instead
