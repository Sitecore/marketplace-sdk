[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / BaseQueryOptions

# Interface: BaseQueryOptions\<TData, TError, TParams\>

Defined in: [packages/client/src/types.ts:15](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L15)

## Extended by

- [`QueryOptions`](QueryOptions.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | `unknown` |
| `TError` *extends* `Error` | `Error` |
| `TParams` | `object` |

## Properties

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [packages/client/src/types.ts:21](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L21)

Called when the query encounters an error

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `TError` |

#### Returns

`void`

***

### onSuccess()?

> `optional` **onSuccess**: (`data`) => `void`

Defined in: [packages/client/src/types.ts:19](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L19)

Called when the query successfully completes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `TData` |

#### Returns

`void`

***

### params?

> `optional` **params**: `TParams`

Defined in: [packages/client/src/types.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L23)

Additional parameters for the query; always includes headers, query and body

***

### subscribe?

> `optional` **subscribe**: `boolean`

Defined in: [packages/client/src/types.ts:17](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L17)

Whether to subscribe to updates for this query

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Defined in: [packages/client/src/types.ts:25](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L25)

Custom timeout in milliseconds
