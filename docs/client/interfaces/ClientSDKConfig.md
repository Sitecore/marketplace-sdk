[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / ClientSDKConfig

# Interface: ClientSDKConfig

Defined in: [client/src/types.ts:73](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L73)

ClientSDKConfig is the configuration used by the Client SDK.
Instead of exposing a CoreSDK instance, users should provide the
configuration needed to initialize CoreSDK internally.

## Extends

- `CoreSDKConfig`

## Properties

### events?

> `optional` **events**: `object`

Defined in: [client/src/types.ts:79](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L79)

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

Defined in: [client/src/types.ts:83](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L83)

***

### selfOrigin

> **selfOrigin**: `string`

Defined in: [client/src/types.ts:77](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L77)

Our own origin – this defaults to the value of window.location.origin

#### Overrides

`CoreSDKConfig.selfOrigin`

***

### target?

> `optional` **target**: `Window`

Defined in: core/dist/types.d.ts:8

The target window to communicate with (e.g., iframe.contentWindow)

#### Inherited from

`CoreSDKConfig.target`

***

### targetOrigin?

> `optional` **targetOrigin**: `string`

Defined in: [client/src/types.ts:75](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/client/src/types.ts#L75)

The origin of the remote endpoint (e.g. client for the host, or host for the client)

#### Overrides

`CoreSDKConfig.targetOrigin`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: core/dist/types.d.ts:14

Optional timeout for requests in milliseconds (default: 30000)

#### Inherited from

`CoreSDKConfig.timeout`
