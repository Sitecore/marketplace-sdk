[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / SubscribeOptions

# Interface: SubscribeOptions\<K\>

Defined in: [packages/client/src/types.ts:73](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L73)

Options for subscribing to events

## Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* [`SubscribeKey`](../type-aliases/SubscribeKey.md) |

## Properties

### onData()

> **onData**: (`data`) => `void`

Defined in: [packages/client/src/types.ts:75](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L75)

Called when data is received for the subscription

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`SubscribeMap`](SubscribeMap.md)\[`K`\]\[`"data"`\] |

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [packages/client/src/types.ts:77](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L77)

Called when the subscription encounters an error

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

#### Returns

`void`
