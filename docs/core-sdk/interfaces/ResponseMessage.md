[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / ResponseMessage

# Interface: ResponseMessage\<T\>

Defined in: [packages/core/src/types.ts:94](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L94)

Response message sent in reply to a request.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Properties

### data?

> `optional` **data**: `T`

Defined in: [packages/core/src/types.ts:100](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L100)

Response data if the request was successful

***

### error?

> `optional` **error**: `object`

Defined in: [packages/core/src/types.ts:102](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L102)

Error information if the request failed

#### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Error code

#### details?

> `optional` **details**: `unknown`

Optional additional details about the error

#### message

> **message**: `string`

Error message

***

### id

> **id**: `string`

Defined in: [packages/core/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L37)

Unique identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`id`](BaseMessage.md#id)

***

### source?

> `optional` **source**: `string`

Defined in: [packages/core/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L43)

Source identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`source`](BaseMessage.md#source)

***

### success

> **success**: `boolean`

Defined in: [packages/core/src/types.ts:98](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L98)

Indicates whether the request was successful

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/core/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L41)

Timestamp when the message was created

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`timestamp`](BaseMessage.md#timestamp)

***

### type

> **type**: `"response"`

Defined in: [packages/core/src/types.ts:96](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L96)

Message type is always "response"

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
