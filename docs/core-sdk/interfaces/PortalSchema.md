[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / PortalSchema

# Interface: PortalSchema

Defined in: [packages/core/src/types.ts:162](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L162)

## Extends

- [`BaseHostSchema`](BaseHostSchema.md)

## Properties

### iframeMetadata

> **iframeMetadata**: [`IframeMetadata`](IframeMetadata.md)

Defined in: [packages/core/src/types.ts:149](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L149)

#### Inherited from

[`BaseHostSchema`](BaseHostSchema.md).[`iframeMetadata`](BaseHostSchema.md#iframemetadata)

***

### methods

> **methods**: `object` & `object`

Defined in: [packages/core/src/types.ts:163](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L163)

#### Type declaration

##### getUserInfo()

> **getUserInfo**: () => `Promise`\<[`UserInfo`](UserInfo.md)\>

###### Returns

`Promise`\<[`UserInfo`](UserInfo.md)\>

#### Type declaration

##### getAdditionalData()

> **getAdditionalData**: () => `Promise`\<[`AdditionalData`](AdditionalData.md)\>

###### Returns

`Promise`\<[`AdditionalData`](AdditionalData.md)\>

#### Overrides

[`BaseHostSchema`](BaseHostSchema.md).[`methods`](BaseHostSchema.md#methods)

***

### version

> **version**: `string`

Defined in: [packages/core/src/types.ts:148](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L148)

#### Inherited from

[`BaseHostSchema`](BaseHostSchema.md).[`version`](BaseHostSchema.md#version)
