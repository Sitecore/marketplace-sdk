[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / ClientSDKConfig

# Interface: ClientSDKConfig

Defined in: [packages/client/src/types.ts:85](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L85)

ClientSDKConfig is the configuration used by the Client SDK.
Instead of exposing a CoreSDK instance, users should provide the
configuration needed to initialize CoreSDK internally.

## Extends

- `CoreSDKConfig`

## Properties

### events?

> `optional` **events**: `object`

Defined in: [packages/client/src/types.ts:91](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L91)

Events that the SDK can listen for

#### onPageContextUpdate()?

> `optional` **onPageContextUpdate**: (`data`) => `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `any` |

##### Returns

`void`

#### onRouteUpdate()?

> `optional` **onRouteUpdate**: (`route`) => `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `route` | `string` |

##### Returns

`void`

***

### navbarItems?

> `optional` **navbarItems**: [`NavbarItemsProps`](NavbarItemsProps.md)

Defined in: [packages/client/src/types.ts:95](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L95)

***

### selfOrigin

> **selfOrigin**: `string`

Defined in: [packages/client/src/types.ts:89](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L89)

Our own origin – this defaults to the value of window.location.origin

#### Overrides

`CoreSDKConfig.selfOrigin`

***

### target?

> `optional` **target**: `Window`

Defined in: node\_modules/.pnpm/@sitecore-marketplace-sdk+core@0.3.2/node\_modules/@sitecore-marketplace-sdk/core/dist/types.d.ts:8

The target window to communicate with (e.g., iframe.contentWindow)

#### Inherited from

`CoreSDKConfig.target`

***

### targetOrigin?

> `optional` **targetOrigin**: `string`

Defined in: [packages/client/src/types.ts:87](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/types.ts#L87)

The origin of the remote endpoint (e.g. client for the host, or host for the client)

#### Overrides

`CoreSDKConfig.targetOrigin`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: node\_modules/.pnpm/@sitecore-marketplace-sdk+core@0.3.2/node\_modules/@sitecore-marketplace-sdk/core/dist/types.d.ts:14

Optional timeout for requests in milliseconds (default: 30000)

#### Inherited from

`CoreSDKConfig.timeout`
