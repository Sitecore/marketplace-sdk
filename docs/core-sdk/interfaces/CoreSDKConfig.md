[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / CoreSDKConfig

# Interface: CoreSDKConfig

Defined in: [packages/core/src/types.ts:7](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L7)

Configuration for the Core SDK.

## Properties

### selfOrigin

> **selfOrigin**: `string`

Defined in: [packages/core/src/types.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L13)

The origin of the current window (usually window.location.origin)

***

### target?

> `optional` **target**: `Window`

Defined in: [packages/core/src/types.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L9)

The target window to communicate with (e.g., iframe.contentWindow)

***

### targetOrigin?

> `optional` **targetOrigin**: `string`

Defined in: [packages/core/src/types.ts:11](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L11)

The origin of the target (e.g., "https://example.com")

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [packages/core/src/types.ts:15](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/types.ts#L15)

Optional timeout for requests in milliseconds (default: 30000)
