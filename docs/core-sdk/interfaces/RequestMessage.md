[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / RequestMessage

# Interface: RequestMessage\<T\>

Defined in: [packages/core/src/types.ts:82](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L82)

Request message sent to perform an action.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Properties

### action

> **action**: `string`

Defined in: [packages/core/src/types.ts:86](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L86)

The action to perform (e.g., "host.user")

***

### id

> **id**: `string`

Defined in: [packages/core/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L37)

Unique identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`id`](BaseMessage.md#id)

***

### payload?

> `optional` **payload**: `T`

Defined in: [packages/core/src/types.ts:88](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L88)

Optional payload data for the request

***

### source?

> `optional` **source**: `string`

Defined in: [packages/core/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L43)

Source identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`source`](BaseMessage.md#source)

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/core/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L41)

Timestamp when the message was created

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`timestamp`](BaseMessage.md#timestamp)

***

### type

> **type**: `"request"`

Defined in: [packages/core/src/types.ts:84](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L84)

Message type is always "request"

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
