[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / QueryResult

# Interface: QueryResult\<K\>

Defined in: [client/src/types.ts:48](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L48)

## Extends

- [`BaseQueryResult`](BaseQueryResult.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`\>

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`QueryKey`](../type-aliases/QueryKey.md) |

## Properties

### data

> **data**: `undefined` \| [`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\]

Defined in: [client/src/types.ts:31](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L31)

The current data value

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`data`](BaseQueryResult.md#data)

***

### error

> **error**: `undefined` \| `Error`

Defined in: [client/src/types.ts:33](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L33)

The current error if any

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`error`](BaseQueryResult.md#error)

***

### isError

> **isError**: `boolean`

Defined in: [client/src/types.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L39)

Whether the query has errored

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isError`](BaseQueryResult.md#iserror)

***

### isLoading

> **isLoading**: `boolean`

Defined in: [client/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L37)

Whether the query is currently loading

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isLoading`](BaseQueryResult.md#isloading)

***

### isSuccess

> **isSuccess**: `boolean`

Defined in: [client/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L41)

Whether the query was successful

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isSuccess`](BaseQueryResult.md#issuccess)

***

### refetch()

> **refetch**: () => `Promise`\<[`BaseQueryResult`](BaseQueryResult.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`\>\>

Defined in: [client/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L43)

Function to manually trigger a refetch

#### Returns

`Promise`\<[`BaseQueryResult`](BaseQueryResult.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`\>\>

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`refetch`](BaseQueryResult.md#refetch)

***

### status

> **status**: [`QueryStatus`](../type-aliases/QueryStatus.md)

Defined in: [client/src/types.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L35)

The current status of the query

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`status`](BaseQueryResult.md#status)

***

### unsubscribe()?

> `optional` **unsubscribe**: () => `void`

Defined in: [client/src/types.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L45)

Function to unsubscribe if subscribed

#### Returns

`void`

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`unsubscribe`](BaseQueryResult.md#unsubscribe)
