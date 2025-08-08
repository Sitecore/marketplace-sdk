[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / ClientSDK

# Class: ClientSDK

Defined in: [client/src/client.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L41)

## Constructors

### Constructor

> **new ClientSDK**(`config`): `ClientSDK`

Defined in: [client/src/client.ts:46](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L46)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`ClientSDKConfig`](../interfaces/ClientSDKConfig.md) |

#### Returns

`ClientSDK`

## Methods

### closeApp()

> **closeApp**(): `Promise`\<`void`\>

Defined in: [client/src/client.ts:448](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L448)

Requests the host application to close the app.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the operation is complete.

***

### destroy()

> **destroy**(): `void`

Defined in: [client/src/client.ts:471](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L471)

Cleans up all active subscriptions and resources.
Call this when the SDK instance is no longer needed.

#### Returns

`void`

***

### emitRouteEvent()

> **emitRouteEvent**(`route`): `Promise`\<`void`\>

Defined in: [client/src/client.ts:416](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L416)

Sends a route event to consumers without triggering navigation.
This method broadcasts route information that can be received by listeners
registered to the 'host.route' event.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | The route path or identifier to broadcast |

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the event has been sent

#### Example

```typescript
// Send a route event with additional context data
await client.emitRouteEvent('/products/123');

***

### getValue()

> **getValue**(): `Promise`\<`any`\>

Defined in: [client/src/client.ts:430](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L430)

Requests the current value from the host application.

#### Returns

`Promise`\<`any`\>

A Promise resolving to the value returned by the host.

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

Defined in: [client/src/client.ts:114](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L114)

Initializes the client SDK by performing a handshake with the host application.
Must be called after the client script loads (when running inside an iframe).

#### Returns

`Promise`\<`void`\>

A Promise that resolves once the handshake is successfully completed.

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: [client/src/client.ts:386](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L386)

#### Returns

`Promise`\<`void`\>

***

### mutate()

> **mutate**\<`K`\>(`key`, `mutationOptions?`): `Promise`\<[`MutationMap`](../interfaces/MutationMap.md)\[`K`\]\[`"response"`\]\>

Defined in: [client/src/client.ts:338](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L338)

Executes a mutation against the host application. Mutations trigger host-side state changes or HTTP requests.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`MutationMap`](../interfaces/MutationMap.md) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `K` | The mutation key identifying the resource (e.g. 'host.update', 'host.delete') |
| `mutationOptions?` | [`MutationOptions`](../interfaces/MutationOptions.md)\<`K`\> | - |

#### Returns

`Promise`\<[`MutationMap`](../interfaces/MutationMap.md)\[`K`\]\[`"response"`\]\>

#### Example

```typescript
// Mutation with key
const response = await client.mutate('host.update', {
  params: { id: 1, name: 'New Name' },
  onSuccess: (data) => console.log('Update successful:', data),
  onError: (error) => console.error('Update failed:', error),
});
```

***

### navigateToExternalUrl()

> **navigateToExternalUrl**(`url`, `newTab`): `Promise`\<`void`\>

Defined in: [client/src/client.ts:394](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L394)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `url` | `string` | `undefined` |
| `newTab` | `boolean` | `true` |

#### Returns

`Promise`\<`void`\>

***

### openProfile()

> **openProfile**(): `Promise`\<`void`\>

Defined in: [client/src/client.ts:390](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L390)

#### Returns

`Promise`\<`void`\>

***

### query()

> **query**\<`K`\>(`key`, `queryOptions?`): `Promise`\<[`QueryResult`](../interfaces/QueryResult.md)\<`K`\>\>

Defined in: [client/src/client.ts:218](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L218)

Executes a query against the host application. Queries can be one-off requests
or subscriptions that receive live updates.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`QueryMap`](../interfaces/QueryMap.md) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `K` | The query key identifying the resource (e.g. 'host.state', 'host.user') |
| `queryOptions?` | [`QueryOptions`](../interfaces/QueryOptions.md)\<`K`\> | - |

#### Returns

`Promise`\<[`QueryResult`](../interfaces/QueryResult.md)\<`K`\>\>

#### Example

```typescript
// One-off query
const { data } = await client.query('host.user');

// Query with subscription
const { data, unsubscribe } = await client.query('host.state', {
  subscribe: true,
  onSuccess: (newState) => console.log('State updated:', newState)
});

// Later: cleanup subscription
unsubscribe?.();
```

***

### setValue()

> **setValue**(`value`, `canvasReload?`): `Promise`\<`void`\>

Defined in: [client/src/client.ts:440](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L440)

Sets a value in the host application.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The value to set. |
| `canvasReload?` | `boolean` | Optional flag to trigger canvas reload in the host. |

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the operation is complete.

***

### init()

> `static` **init**(`config`): `Promise`\<`ClientSDK`\>

Defined in: [client/src/client.ts:73](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/client/src/client.ts#L73)

Creates and initializes a ClientSDK instance.

This static method encapsulates the logic that was formerly in create-client.ts.
It builds the necessary configuration, instantiates the ClientSDK, performs the handshake,
and returns an instance that is ready to execute requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`ClientSDKInitConfig`](../type-aliases/ClientSDKInitConfig.md) | The configuration for the client SDK. Includes the host origin, the target window (typically window.parent), and an optional timeout. |

#### Returns

`Promise`\<`ClientSDK`\>

A Promise that resolves with an initialized and ready-to-use ClientSDK instance.

#### Example

```typescript
const client = await ClientSDK.init({
  origin: 'https://host.app',
  target: window.parent,
  timeout: 5000
});
```
