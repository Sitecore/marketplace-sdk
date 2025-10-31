[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Agent](../README.md) / BodyAssetsUploadAsset

# Type Alias: BodyAssetsUploadAsset

> **BodyAssetsUploadAsset** = `object`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:73

## Properties

### file

> **file**: `Blob` \| `File`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:74

***

### upload\_request

> **upload\_request**: `string`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:97

JSON string containing document creation parameters.
Expected structure:
{
"name":  "string (required) - Name of the asset",
"itemPath": "string (required) - Path to the asset item",
"language": "string (required) - Language of the asset",
"extension": "string (required) - File extension of the asset",
"siteName": "string (required) - Name of the site"
}

Example:
{
"name": "example.jpg",
"itemPath": "/sitecore/Media Library/Images",
"language": "en",
"extension": "jpg",
"siteName": "MySite"
}
