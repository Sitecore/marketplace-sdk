[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / StateQueryResult

# Interface: StateQueryResult\<TData, TError\>

Defined in: [client/src/types.ts:51](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L51)

## Extends

- [`BaseQueryResult`](BaseQueryResult.md)\<`TData`, `TError`\>

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | `unknown` |
| `TError` *extends* `Error` | `Error` |

## Properties

### data

> **data**: `undefined` \| `TData`

Defined in: [client/src/types.ts:31](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L31)

The current data value

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`data`](BaseQueryResult.md#data)

***

### error

> **error**: `undefined` \| `TError`

Defined in: [client/src/types.ts:33](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L33)

The current error if any

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`error`](BaseQueryResult.md#error)

***

### isError

> **isError**: `boolean`

Defined in: [client/src/types.ts:39](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L39)

Whether the query has errored

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isError`](BaseQueryResult.md#iserror)

***

### isLoading

> **isLoading**: `boolean`

Defined in: [client/src/types.ts:37](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L37)

Whether the query is currently loading

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isLoading`](BaseQueryResult.md#isloading)

***

### isSuccess

> **isSuccess**: `boolean`

Defined in: [client/src/types.ts:41](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L41)

Whether the query was successful

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`isSuccess`](BaseQueryResult.md#issuccess)

***

### refetch()

> **refetch**: () => `Promise`\<[`BaseQueryResult`](BaseQueryResult.md)\<`TData`, `TError`\>\>

Defined in: [client/src/types.ts:43](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L43)

Function to manually trigger a refetch

#### Returns

`Promise`\<[`BaseQueryResult`](BaseQueryResult.md)\<`TData`, `TError`\>\>

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`refetch`](BaseQueryResult.md#refetch)

***

### status

> **status**: [`QueryStatus`](../type-aliases/QueryStatus.md)

Defined in: [client/src/types.ts:35](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L35)

The current status of the query

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`status`](BaseQueryResult.md#status)

***

### unsubscribe()?

> `optional` **unsubscribe**: () => `void`

Defined in: [client/src/types.ts:45](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a15dca7cb666bfc995f5b0ffe9b11bcaff15c96c/packages/client/src/types.ts#L45)

Function to unsubscribe if subscribed

#### Returns

`void`

#### Inherited from

[`BaseQueryResult`](BaseQueryResult.md).[`unsubscribe`](BaseQueryResult.md#unsubscribe)
