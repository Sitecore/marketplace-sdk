[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / BaseMessage

# Interface: BaseMessage

Defined in: [packages/core/src/types.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L35)

Base message interface for all message types.

## Extended by

- [`HandshakeMessage`](HandshakeMessage.md)
- [`RequestMessage`](RequestMessage.md)
- [`ResponseMessage`](ResponseMessage.md)
- [`EventMessage`](EventMessage.md)

## Properties

### id

> **id**: `string`

Defined in: [packages/core/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L37)

Unique identifier for the message

***

### source?

> `optional` **source**: `string`

Defined in: [packages/core/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L43)

Source identifier for the message

***

### timestamp

> **timestamp**: `number`

Defined in: [packages/core/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L41)

Timestamp when the message was created

***

### type

> **type**: `"request"` \| `"response"` \| `"event"` \| `"handshake"`

Defined in: [packages/core/src/types.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/core/src/types.ts#L39)

Message type ("request", "response", "event", or "handshake")
