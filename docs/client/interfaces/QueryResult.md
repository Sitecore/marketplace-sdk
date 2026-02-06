[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / QueryResult

# Interface: QueryResult\<K\>

Defined in: [packages/client/src/types.ts:50](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L50)

## Extends

- [`BaseQueryResult`](BaseQueryResult.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`\>

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`QueryKey`](../type-aliases/QueryKey.md) |

## Properties

### data

> **data**: [`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\] \| `undefined`

Defined in: [packages/client/src/types.ts:33](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L33)

The current data value

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`data`](BaseQueryResult.md#data)

***

### error

> **error**: `Error` \| `undefined`

Defined in: [packages/client/src/types.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L35)

The current error if any

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`error`](BaseQueryResult.md#error)

***

### isError

> **isError**: `boolean`

Defined in: [packages/client/src/types.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L41)

Whether the query has errored

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isError`](BaseQueryResult.md#iserror)

***

### isLoading

> **isLoading**: `boolean`

Defined in: [packages/client/src/types.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L39)

Whether the query is currently loading

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isLoading`](BaseQueryResult.md#isloading)

***

### isSuccess

> **isSuccess**: `boolean`

Defined in: [packages/client/src/types.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L43)

Whether the query was successful

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isSuccess`](BaseQueryResult.md#issuccess)

***

### refetch()

> **refetch**: () => `Promise`\<[`BaseQueryResult`](BaseQueryResult.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`\>\>

Defined in: [packages/client/src/types.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L45)

Function to manually trigger a refetch

#### Returns

`Promise`\<[`BaseQueryResult`](BaseQueryResult.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`\>\>

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`refetch`](BaseQueryResult.md#refetch)

***

### status

> **status**: [`QueryStatus`](../type-aliases/QueryStatus.md)

Defined in: [packages/client/src/types.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L37)

The current status of the query

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`status`](BaseQueryResult.md#status)

***

### unsubscribe()?

> `optional` **unsubscribe**: () => `void`

Defined in: [packages/client/src/types.ts:47](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L47)

Function to unsubscribe if subscribed

#### Returns

`void`

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`unsubscribe`](BaseQueryResult.md#unsubscribe)
