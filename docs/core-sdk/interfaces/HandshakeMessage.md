[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / HandshakeMessage

# Interface: HandshakeMessage

Defined in: [packages/core/src/types.ts:49](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L49)

Handshake message sent to initiate or respond to a handshake.

## Extends

- [`BaseMessage`](BaseMessage.md)

## Extended by

- [`HandshakeResponseMessage`](HandshakeResponseMessage.md)

## Properties

### event

> **event**: `string`

Defined in: [packages/core/src/types.ts:53](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L53)

The handshake event (e.g., "handshake:init")

***

### handshakeType

> **handshakeType**: `"request"` \| `"response"`

Defined in: [packages/core/src/types.ts:55](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L55)

Type of handshake (request or response)

***

### id

> **id**: `string`

Defined in: [packages/core/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L37)

Unique identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`id`](BaseMessage.md#id)

***

### sdkType

> **sdkType**: `"host"` \| `"client"`

Defined in: [packages/core/src/types.ts:57](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L57)

Type of SDK (host or client)

***

### source?

> `optional` **source**: `string`

Defined in: [packages/core/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L43)

Source identifier for the message

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`source`](BaseMessage.md#source)

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/core/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L41)

Timestamp when the message was created

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`timestamp`](BaseMessage.md#timestamp)

***

### type

> **type**: `"handshake"`

Defined in: [packages/core/src/types.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L51)

Message type is always "handshake"

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)

***

### version

> **version**: `string`

Defined in: [packages/core/src/types.ts:59](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L59)

Version of the SDK for compatibility checking
