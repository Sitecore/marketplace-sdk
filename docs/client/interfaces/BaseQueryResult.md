[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / BaseQueryResult

# Interface: BaseQueryResult\<TData, TError\>

Defined in: [packages/client/src/types.ts:31](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L31)

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

> **data**: `TData` \| `undefined`

Defined in: [packages/client/src/types.ts:33](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L33)

The current data value

***

### error

> **error**: `TError` \| `undefined`

Defined in: [packages/client/src/types.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L35)

The current error if any

***

### isError

> **isError**: `boolean`

Defined in: [packages/client/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L41)

Whether the query has errored

***

### isLoading

> **isLoading**: `boolean`

Defined in: [packages/client/src/types.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L39)

Whether the query is currently loading

***

### isSuccess

> **isSuccess**: `boolean`

Defined in: [packages/client/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L43)

Whether the query was successful

***

### refetch()

> **refetch**: () => `Promise`\<`BaseQueryResult`\<`TData`, `TError`\>\>

Defined in: [packages/client/src/types.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L45)

Function to manually trigger a refetch

#### Returns

`Promise`\<`BaseQueryResult`\<`TData`, `TError`\>\>

***

### status

> **status**: [`QueryStatus`](../type-aliases/QueryStatus.md)

Defined in: [packages/client/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L37)

The current status of the query

***

### unsubscribe()?

> `optional` **unsubscribe**: () => `void`

Defined in: [packages/client/src/types.ts:47](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L47)

Function to unsubscribe if subscribed

#### Returns

`void`
