[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / GenericResponseData

# Class: GenericResponseData

Defined in: [packages/core/src/shared-types.ts:47](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L47)

## Constructors

### Constructor

> **new GenericResponseData**(`status`, `statusText`, `headers`, `body`): `GenericResponseData`

Defined in: [packages/core/src/shared-types.ts:53](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L53)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `status` | `number` |
| `statusText` | `string` |
| `headers` | `Record`\<`string`, `string`\> |
| `body` | `ArrayBuffer` |

#### Returns

`GenericResponseData`

## Properties

### body

> **body**: `ArrayBuffer`

Defined in: [packages/core/src/shared-types.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L51)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [packages/core/src/shared-types.ts:50](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L50)

***

### status

> **status**: `number`

Defined in: [packages/core/src/shared-types.ts:48](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L48)

***

### statusText

> **statusText**: `string`

Defined in: [packages/core/src/shared-types.ts:49](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L49)

## Methods

### arrayBuffer()

> **arrayBuffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [packages/core/src/shared-types.ts:85](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L85)

Returns the body as an ArrayBuffer.

#### Returns

`Promise`\<`ArrayBuffer`\>

The raw binary data.

***

### blob()

> **blob**(): `Promise`\<`Blob`\>

Defined in: [packages/core/src/shared-types.ts:93](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L93)

Returns the body as a Blob.

#### Returns

`Promise`\<`Blob`\>

The Blob representation of the response body.

***

### json()

> **json**(): `Promise`\<`any`\>

Defined in: [packages/core/src/shared-types.ts:69](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L69)

Parses the body of the response as JSON.

#### Returns

`Promise`\<`any`\>

The parsed JSON object.

***

### text()

> **text**(): `Promise`\<`string`\>

Defined in: [packages/core/src/shared-types.ts:77](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L77)

Parses the body of the response as a string.

#### Returns

`Promise`\<`string`\>

The parsed text.
