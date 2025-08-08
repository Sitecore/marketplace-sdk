[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / CoreSDK

# Class: CoreSDK

Defined in: [packages/core/src/index.ts:22](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L22)

Core SDK for managing communication between host and client applications.
Provides a high-level API for bidirectional communication through postMessage.

Features:
- Type-safe messaging
- Request/response pattern
- Event pub/sub system
- Secure handshake protocol
- Origin validation
// TODO: add examples

## Constructors

### Constructor

> **new CoreSDK**(`config`): `CoreSDK`

Defined in: [packages/core/src/index.ts:33](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L33)

Creates a new instance of the Core SDK.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`CoreSDKConfig`](../interfaces/CoreSDKConfig.md) | Configuration options for the SDK Note: If no target is provided in the config, the SDK will be initialized in "listener mode" where it can receive messages but cannot send them until a target is set using setTarget(). |

#### Returns

`CoreSDK`

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: [packages/core/src/index.ts:68](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L68)

Connects the SDK by performing the handshake with the other side.
For the client, this sends the handshake init message.
For the host, this completes the connection once a handshake init message is received and responded to.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the connection is established

#### Throws

If already initialized

***

### destroy()

> **destroy**(): `void`

Defined in: [packages/core/src/index.ts:132](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L132)

Cleans up resources and removes event listeners.
The SDK instance cannot be used after calling this method.

#### Returns

`void`

***

### emit()

> **emit**\<`T`\>(`event`, `payload`): `void`

Defined in: [packages/core/src/index.ts:105](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L105)

Emits an event to the other side.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `string` | Event name |
| `payload` | `T` | Data to send with the event |

#### Returns

`void`

#### Throws

If not initialized

***

### initialize()

> **initialize**(`config`): `void`

Defined in: [packages/core/src/index.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L45)

Initializes the SDK with basic configuration. This method sets up event listeners
but doesn't perform the handshake yet. For the host, this allows listening for
handshake messages before the iframe is fully loaded.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`HandshakeConfig`](../interfaces/HandshakeConfig.md) | Handshake configuration |

#### Returns

`void`

#### Throws

If already initialized or handshake fails

***

### isConnected()

> **isConnected**(): `boolean`

Defined in: [packages/core/src/index.ts:76](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L76)

Checks if the SDK is connected.

#### Returns

`boolean`

True if connected, false otherwise

***

### isInListenerMode()

> **isInListenerMode**(): `boolean`

Defined in: [packages/core/src/index.ts:84](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L84)

Checks if the SDK is in listener mode (no target set yet).

#### Returns

`boolean`

True if in listener mode, false otherwise

***

### on()

> **on**\<`T`\>(`event`, `handler`): () => `void`

Defined in: [packages/core/src/index.ts:115](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L115)

Subscribes to events from the other side.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `string` | Event name to listen for |
| `handler` | (`data`) => `void` | Callback to handle the event data |

#### Returns

Function to unsubscribe from the event

> (): `void`

##### Returns

`void`

***

### onRequest()

> **onRequest**\<`T`, `R`\>(`action`, `handler`): `void`

Defined in: [packages/core/src/index.ts:124](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L124)

Registers a request handler for incoming requests.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `R` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `action` | `string` | The action to register the handler for |
| `handler` | (`payload`) => `R` \| `Promise`\<`R`\> | The handler function to register |

#### Returns

`void`

***

### request()

> **request**\<`T`, `R`\>(`action`, `payload?`): `Promise`\<`R`\>

Defined in: [packages/core/src/index.ts:95](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L95)

Sends a request to the other side and waits for a response.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `R` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `action` | `string` | The action to perform |
| `payload?` | `T` | Optional data to send with the request |

#### Returns

`Promise`\<`R`\>

Promise that resolves with the response data

#### Throws

If not initialized or request fails

***

### setTarget()

> **setTarget**(`target`): `void`

Defined in: [packages/core/src/index.ts:56](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/index.ts#L56)

Sets or updates the target window for communication.
This is useful for host applications that need to establish the iframe
target after the SDK is already initialized.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `Window` | The target window to communicate with (typically iframe.contentWindow) |

#### Returns

`void`
