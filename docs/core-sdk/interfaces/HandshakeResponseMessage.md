[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / HandshakeResponseMessage

# Interface: HandshakeResponseMessage

Defined in: [packages/core/src/types.ts:65](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L65)

Handshake response message sent by the host to the client.

## Extends

- [`HandshakeMessage`](HandshakeMessage.md)

## Properties

### error?

> `optional` **error**: `object`

Defined in: [packages/core/src/types.ts:71](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L71)

Error information if the handshake failed

#### code

> **code**: `string`

Error code

#### message

> **message**: `string`

Error message

***

### event

> **event**: `string`

Defined in: [packages/core/src/types.ts:53](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L53)

The handshake event (e.g., "handshake:init")

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`event`](HandshakeMessage.md#event)

***

### handshakeType

> **handshakeType**: `"response"`

Defined in: [packages/core/src/types.ts:67](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L67)

Handshake type is always response for this message

#### Overrides

[`HandshakeMessage`](HandshakeMessage.md).[`handshakeType`](HandshakeMessage.md#handshaketype)

***

### id

> **id**: `string`

Defined in: [packages/core/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L37)

Unique identifier for the message

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`id`](HandshakeMessage.md#id)

***

### sdkType

> **sdkType**: `"host"` \| `"client"`

Defined in: [packages/core/src/types.ts:57](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L57)

Type of SDK (host or client)

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`sdkType`](HandshakeMessage.md#sdktype)

***

### source?

> `optional` **source**: `string`

Defined in: [packages/core/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L43)

Source identifier for the message

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`source`](HandshakeMessage.md#source)

***

### success

> **success**: `boolean`

Defined in: [packages/core/src/types.ts:69](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L69)

Indicates whether the handshake was successful

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/core/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L41)

Timestamp when the message was created

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`timestamp`](HandshakeMessage.md#timestamp)

***

### type

> **type**: `"handshake"`

Defined in: [packages/core/src/types.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L51)

Message type is always "handshake"

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`type`](HandshakeMessage.md#type)

***

### version

> **version**: `string`

Defined in: [packages/core/src/types.ts:59](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/types.ts#L59)

Version of the SDK for compatibility checking

#### Inherited from

[`HandshakeMessage`](HandshakeMessage.md).[`version`](HandshakeMessage.md#version)
