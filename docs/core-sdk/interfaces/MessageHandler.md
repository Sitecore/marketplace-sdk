[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / MessageHandler

# Interface: MessageHandler

Defined in: [packages/core/src/types.ts:129](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L129)

## Properties

### onEvent()

> **onEvent**: (`message`) => `void`

Defined in: [packages/core/src/types.ts:131](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L131)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | [`EventMessage`](EventMessage.md) |

#### Returns

`void`

***

### onRequest()

> **onRequest**: (`message`) => `Promise`\<`unknown`\>

Defined in: [packages/core/src/types.ts:130](https://github.com/Sitecore/sitecore-marketplace-sdk/blob/c654677445b16d8ca23b9ea08164f907627519f1/packages/core/src/types.ts#L130)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | [`RequestMessage`](RequestMessage.md) |

#### Returns

`Promise`\<`unknown`\>
