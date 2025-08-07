[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / BaseQueryResult

# Interface: BaseQueryResult\<TData, TError\>

Defined in: [client/src/types.ts:29](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L29)

## Extended by

- [`QueryResult`](QueryResult.md)
- [`StateQueryResult`](StateQueryResult.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | `unknown` |
| `TError` *extends* `Error` | `Error` |

## Properties

### data

> **data**: `undefined` \| `TData`

Defined in: [client/src/types.ts:31](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L31)

The current data value

***

### error

> **error**: `undefined` \| `TError`

Defined in: [client/src/types.ts:33](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L33)

The current error if any

***

### isError

> **isError**: `boolean`

Defined in: [client/src/types.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L39)

Whether the query has errored

***

### isLoading

> **isLoading**: `boolean`

Defined in: [client/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L37)

Whether the query is currently loading

***

### isSuccess

> **isSuccess**: `boolean`

Defined in: [client/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L41)

Whether the query was successful

***

### refetch()

> **refetch**: () => `Promise`\<`BaseQueryResult`\<`TData`, `TError`\>\>

Defined in: [client/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L43)

Function to manually trigger a refetch

#### Returns

`Promise`\<`BaseQueryResult`\<`TData`, `TError`\>\>

***

### status

> **status**: [`QueryStatus`](../type-aliases/QueryStatus.md)

Defined in: [client/src/types.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L35)

The current status of the query

***

### unsubscribe()?

> `optional` **unsubscribe**: () => `void`

Defined in: [client/src/types.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L45)

Function to unsubscribe if subscribed

#### Returns

`void`
