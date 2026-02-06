[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / QueryOptions

# Interface: QueryOptions\<K\>

Defined in: [packages/client/src/types.ts:28](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L28)

## Extends

- [`BaseQueryOptions`](BaseQueryOptions.md)\<[`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\], `Error`, [`QueryMap`](QueryMap.md)\[`K`\]\[`"params"`\]\>

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`QueryKey`](../type-aliases/QueryKey.md) |

## Properties

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [packages/client/src/types.ts:21](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L21)

Called when the query encounters an error

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

#### Returns

`void`

#### Inherited from

[`BaseQueryOptions`](BaseQueryOptions.md).[`onError`](BaseQueryOptions.md#onerror)

***

### onSuccess()?

> `optional` **onSuccess**: (`data`) => `void`

Defined in: [packages/client/src/types.ts:19](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L19)

Called when the query successfully completes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`QueryMap`](QueryMap.md)\[`K`\]\[`"response"`\] |

#### Returns

`void`

#### Inherited from

[`BaseQueryOptions`](BaseQueryOptions.md).[`onSuccess`](BaseQueryOptions.md#onsuccess)

***

### params?

> `optional` **params**: [`QueryMap`](QueryMap.md)\[`K`\]\[`"params"`\]

Defined in: [packages/client/src/types.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L23)

Additional parameters for the query; always includes headers, query and body

#### Inherited from

[`BaseQueryOptions`](BaseQueryOptions.md).[`params`](BaseQueryOptions.md#params)

***

### subscribe?

> `optional` **subscribe**: `boolean`

Defined in: [packages/client/src/types.ts:17](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L17)

Whether to subscribe to updates for this query

#### Inherited from

[`BaseQueryOptions`](BaseQueryOptions.md).[`subscribe`](BaseQueryOptions.md#subscribe)

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Defined in: [packages/client/src/types.ts:25](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L25)

Custom timeout in milliseconds

#### Inherited from

[`BaseQueryOptions`](BaseQueryOptions.md).[`timeoutMs`](BaseQueryOptions.md#timeoutms)
