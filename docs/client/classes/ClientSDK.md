[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / ClientSDK

# Class: ClientSDK

Defined in: [packages/client/src/client.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L44)

## Constructors

### Constructor

> **new ClientSDK**(`config`): `ClientSDK`

Defined in: [packages/client/src/client.ts:49](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L49)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`ClientSDKConfig`](../interfaces/ClientSDKConfig.md) |

#### Returns

`ClientSDK`

## Methods

### closeApp()

> **closeApp**(): `Promise`\<`void`\>

Defined in: [packages/client/src/client.ts:510](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L510)

Requests the host application to close the app.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the operation is complete.

***

### destroy()

> **destroy**(): `void`

Defined in: [packages/client/src/client.ts:533](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L533)

Cleans up all active subscriptions and resources.
Call this when the SDK instance is no longer needed.

#### Returns

`void`

***

### emitRouteEvent()

> **emitRouteEvent**(`route`): `Promise`\<`void`\>

Defined in: [packages/client/src/client.ts:478](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L478)

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

Defined in: [packages/client/src/client.ts:492](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L492)

Requests the current value from the host application.

#### Returns

`Promise`\<`any`\>

A Promise resolving to the value returned by the host.

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

Defined in: [packages/client/src/client.ts:117](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L117)

Initializes the client SDK by performing a handshake with the host application.
Must be called after the client script loads (when running inside an iframe).

#### Returns

`Promise`\<`void`\>

A Promise that resolves once the handshake is successfully completed.

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: [packages/client/src/client.ts:448](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L448)

#### Returns

`Promise`\<`void`\>

***

### mutate()

> **mutate**\<`K`\>(`key`, `mutationOptions?`): `Promise`\<[`MutationMap`](../interfaces/MutationMap.md)\[`K`\]\[`"response"`\]\>

Defined in: [packages/client/src/client.ts:341](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L341)

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

Defined in: [packages/client/src/client.ts:456](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L456)

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

Defined in: [packages/client/src/client.ts:452](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L452)

#### Returns

`Promise`\<`void`\>

***

### query()

> **query**\<`K`\>(`key`, `queryOptions?`): `Promise`\<[`QueryResult`](../interfaces/QueryResult.md)\<`K`\>\>

Defined in: [packages/client/src/client.ts:221](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L221)

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

Defined in: [packages/client/src/client.ts:502](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L502)

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

### subscribe()

> **subscribe**\<`K`\>(`eventKey`, `options`): () => `void`

Defined in: [packages/client/src/client.ts:388](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L388)

Subscribes to events from the host application. This is a dedicated API for event-based subscriptions,
separate from the query API. Use this when you want to listen to specific events like content updates.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof [`SubscribeMap`](../interfaces/SubscribeMap.md) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `eventKey` | `K` | The event key identifying the event to subscribe to, using format '<resource>.<eventAction>' |
| `options` | [`SubscribeOptions`](../interfaces/SubscribeOptions.md)\<`K`\> | Configuration for the subscription |

#### Returns

A function to unsubscribe from the event

> (): `void`

##### Returns

`void`

#### Example

```typescript
// Subscribe to specific event using format <resource>.<eventAction>
const unsubscribe = client.subscribe('pages.content.layoutUpdated', {
  onData: (data) => {
    console.log('Layout updated:', data);
  },
  onError: (error) => {
    console.error('Subscription error:', error);
  }
});

// Later: cleanup subscription
unsubscribe();
```

***

### init()

> `static` **init**(`config`): `Promise`\<`ClientSDK`\>

Defined in: [packages/client/src/client.ts:76](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/client.ts#L76)

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
