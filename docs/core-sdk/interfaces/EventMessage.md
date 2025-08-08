[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / EventMessage

# Interface: EventMessage\<T\>

Defined in: [packages/core/src/types.ts:115](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L115)

Event message sent to notify about an event.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Properties

### event

> **event**: `string`

Defined in: [packages/core/src/types.ts:119](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L119)

The event name

***

### id

> **id**: `string`

Defined in: [packages/core/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L37)

Unique identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`id`](BaseMessage.md#id)

***

### payload?

> `optional` **payload**: `T`

Defined in: [packages/core/src/types.ts:121](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L121)

Optional payload data for the event

***

### source?

> `optional` **source**: `string`

Defined in: [packages/core/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L43)

Source identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`source`](BaseMessage.md#source)

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/core/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L41)

Timestamp when the message was created

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`timestamp`](BaseMessage.md#timestamp)

***

### type

> **type**: `"event"`

Defined in: [packages/core/src/types.ts:117](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/types.ts#L117)

Message type is always "event"

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
