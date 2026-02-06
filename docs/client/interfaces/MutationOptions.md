[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / MutationOptions

# Interface: MutationOptions\<K\>

Defined in: [packages/client/src/types.ts:67](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L67)

## Extends

- [`BaseMutationOptions`](BaseMutationOptions.md)\<[`MutationMap`](MutationMap.md)\[`K`\]\[`"response"`\], `Error`, [`MutationMap`](MutationMap.md)\[`K`\]\[`"params"`\]\>

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`MutationKey`](../type-aliases/MutationKey.md) |

## Properties

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [packages/client/src/types.ts:60](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L60)

Called when the mutation encounters an error

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

#### Returns

`void`

#### Inherited from

[`BaseMutationOptions`](BaseMutationOptions.md).[`onError`](BaseMutationOptions.md#onerror)

***

### onSuccess()?

> `optional` **onSuccess**: (`data`) => `void`

Defined in: [packages/client/src/types.ts:58](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L58)

Called when the mutation successfully completes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`MutationMap`](MutationMap.md)\[`K`\]\[`"response"`\] |

#### Returns

`void`

#### Inherited from

[`BaseMutationOptions`](BaseMutationOptions.md).[`onSuccess`](BaseMutationOptions.md#onsuccess)

***

### params?

> `optional` **params**: [`MutationMap`](MutationMap.md)\[`K`\]\[`"params"`\]

Defined in: [packages/client/src/types.ts:62](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L62)

Additional parameters for the mutation

#### Inherited from

[`BaseMutationOptions`](BaseMutationOptions.md).[`params`](BaseMutationOptions.md#params)

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Defined in: [packages/client/src/types.ts:64](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L64)

Custom timeout in milliseconds

#### Inherited from

[`BaseMutationOptions`](BaseMutationOptions.md).[`timeoutMs`](BaseMutationOptions.md#timeoutms)
