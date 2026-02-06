[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / UploadSiteThumbnailData

# Type Alias: UploadSiteThumbnailData

> **UploadSiteThumbnailData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3536](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3536)

## Properties

### body?

> `optional` **body**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3537](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3537)

#### File

> **File**: `Blob` \| `File`

Image file to be used as a thumbnail. Should be sent as a [form data](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data#a_special_case_sending_files) object.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3543](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3543)

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3549](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3549)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/upload-thumbnail"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3559](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3559)
