[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / ErrorPages

# Type Alias: ErrorPages

> **ErrorPages** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:239](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L239)

An object containing the site error pages identifiers

## Properties

### errorPage?

> `optional` **errorPage**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:244](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L244)

The identifier of the site's 500 error page. You can get page identifiers by calling the /hierarchy endpoint.
Example value: c5a2fe31-46bd-34ae-91fb-d3c24b5a6e7f

***

### notFoundPage?

> `optional` **notFoundPage**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:249](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L249)

The identifier of the site's 404 error page. You can get page identifiers by calling the /hierarchy endpoint.
Example value: a2fc5e31-6b4d-a43e-9f1b-c2d34b5a6e7f
