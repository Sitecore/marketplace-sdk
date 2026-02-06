[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / IFramePermission

# Interface: IFramePermission

Defined in: [packages/core/src/shared-types.ts:200](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L200)

Represents iframe permission settings for sandbox and allow attributes.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### allow?

> `optional` **allow**: `string`[]

Defined in: [packages/core/src/shared-types.ts:204](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L204)

Array of allow permissions (e.g., "clipboard-write", "clipboard-read")

***

### sandbox?

> `optional` **sandbox**: `string`[]

Defined in: [packages/core/src/shared-types.ts:202](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/shared-types.ts#L202)

Array of sandbox permissions (e.g., "allow-popups", "allow-popups-to-escape-sandbox")
