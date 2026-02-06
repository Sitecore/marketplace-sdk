[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / ApplicationRuntimeContext

# Interface: ApplicationRuntimeContext

Defined in: [packages/core/src/shared-types.ts:211](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L211)

Represents the runtime context of an application.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### application

> **application**: `object`

Defined in: [packages/core/src/shared-types.ts:215](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L215)

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

Defined in: [packages/core/src/shared-types.ts:230](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L230)

***

### installationId

> **installationId**: `string`

Defined in: [packages/core/src/shared-types.ts:212](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L212)

***

### MarketplaceAppTenantId?

> `optional` **MarketplaceAppTenantId**: `string`

Defined in: [packages/core/src/shared-types.ts:213](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L213)

***

### organizationId?

> `optional` **organizationId**: `string`

Defined in: [packages/core/src/shared-types.ts:214](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L214)

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/core/src/shared-types.ts:224](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L224)

***

### resourceAccess?

> `optional` **resourceAccess**: [`ApplicationResourceContext`](ApplicationResourceContext.md)[]

Defined in: [packages/core/src/shared-types.ts:229](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L229)

***

### ~~resources?~~

> `optional` **resources**: [`ApplicationResourceContext`](ApplicationResourceContext.md)[]

Defined in: [packages/core/src/shared-types.ts:226](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L226)

#### Deprecated

Use resourceAccess instead

***

### ~~touchpoints?~~

> `optional` **touchpoints**: [`ApplicationTouchpointContext`](ApplicationTouchpointContext.md)[]

Defined in: [packages/core/src/shared-types.ts:228](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L228)

#### Deprecated

Use extensionPoints instead
