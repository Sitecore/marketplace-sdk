[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / BaseMutationOptions

# Interface: BaseMutationOptions\<TData, TError, TParams\>

Defined in: [client/src/types.ts:54](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a90ac03b493793ea5a7d42ef9fc0d2eccdf4f1fb/packages/client/src/types.ts#L54)

## Extended by

- [`MutationOptions`](MutationOptions.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | `unknown` |
| `TError` *extends* `Error` | `Error` |
| `TParams` | `object` |

## Properties

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [client/src/types.ts:58](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a90ac03b493793ea5a7d42ef9fc0d2eccdf4f1fb/packages/client/src/types.ts#L58)

Called when the mutation encounters an error

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `TError` |

#### Returns

`void`

***

### onSuccess()?

> `optional` **onSuccess**: (`data`) => `void`

Defined in: [client/src/types.ts:56](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a90ac03b493793ea5a7d42ef9fc0d2eccdf4f1fb/packages/client/src/types.ts#L56)

Called when the mutation successfully completes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `TData` |

#### Returns

`void`

***

### params?

> `optional` **params**: `TParams`

Defined in: [client/src/types.ts:60](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a90ac03b493793ea5a7d42ef9fc0d2eccdf4f1fb/packages/client/src/types.ts#L60)

Additional parameters for the mutation

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Defined in: [client/src/types.ts:62](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/a90ac03b493793ea5a7d42ef9fc0d2eccdf4f1fb/packages/client/src/types.ts#L62)

Custom timeout in milliseconds
