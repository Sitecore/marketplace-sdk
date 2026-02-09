[**@sitecore-marketplace-sdk/xmc**](../README.md)

***

[@sitecore-marketplace-sdk/xmc](../README.md) / MutationMap

# Interface: MutationMap

Defined in: packages/client/dist/sdk-types.d.ts:252

## Properties

### pages.context

> **pages.context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:258

#### params

> **params**: `PagesContextParams`

#### response

> **response**: `void`

#### subscribe

> **subscribe**: `false`

***

### pages.reloadCanvas

> **pages.reloadCanvas**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:253

#### params

> **params**: `void`

#### response

> **response**: `void`

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.assetsUpdateAsset

> **xmc.agent.assetsUpdateAsset**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:257](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L257)

Updates the metadata and properties of an existing digital asset. This allows you to modify asset information such as alt text, titles, and custom field values.

#### params

> **params**: `Options`\<[`AssetsUpdateAssetData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AssetsUpdateAssetData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`UpdateAssetResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/UpdateAssetResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: UpdateAssetResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.assetsUploadAsset

> **xmc.agent.assetsUploadAsset**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:251](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L251)

Uploads a new digital asset to the system. The asset will be processed and stored in the specified location with the provided metadata.

#### params

> **params**: `Options`\<[`AssetsUploadAssetData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AssetsUploadAssetData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`UploadAssetResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/UploadAssetResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: UploadAssetResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.componentsCreateComponentDatasource

> **xmc.agent.componentsCreateComponentDatasource**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:245](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L245)

Creates a new datasource item for a specific component with the provided field values. The datasource will be created in the appropriate location based on the component's configuration.

#### params

> **params**: `Options`\<[`ComponentsCreateComponentDatasourceData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentsCreateComponentDatasourceData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`CreateComponentDatasourceResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/CreateComponentDatasourceResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: CreateComponentDatasourceResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.contentCreateContentItem

> **xmc.agent.contentCreateContentItem**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:227](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L227)

Creates a new content item with the specified template, fields, and location.

#### params

> **params**: `Options`\<[`ContentCreateContentItemData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentCreateContentItemData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`CreateContentItemResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/CreateContentItemResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: CreateContentItemResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.contentDeleteContent

> **xmc.agent.contentDeleteContent**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:233](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L233)

Deletes a content item and optionally all its child items.

#### params

> **params**: `Options`\<[`ContentDeleteContentData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentDeleteContentData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`DeleteContentResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/DeleteContentResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: DeleteContentResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.contentUpdateContent

> **xmc.agent.contentUpdateContent**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:239](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L239)

Updates comprehensive information about a content item including its fields and metadata.

#### params

> **params**: `Options`\<[`ContentUpdateContentData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentUpdateContentData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`UpdateContentResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/UpdateContentResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: UpdateContentResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.jobsRevertJob

> **xmc.agent.jobsRevertJob**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:269](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L269)

Reverts the operations of the specified job.

#### params

> **params**: `Options`\<[`JobsRevertJobData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/JobsRevertJobData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.pagesAddComponentOnPage

> **xmc.agent.pagesAddComponentOnPage**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:215](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L215)

Adds a component to a specific placeholder on a page. You can optionally specify a datasource for the component or create a new one.

#### params

> **params**: `Options`\<[`PagesAddComponentOnPageData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesAddComponentOnPageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`AddComponentResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AddComponentResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: AddComponentResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.pagesAddLanguageToPage

> **xmc.agent.pagesAddLanguageToPage**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:209](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L209)

Creates a language version of an existing page. This allows you to have the same page content available in multiple languages.

#### params

> **params**: `Options`\<[`PagesAddLanguageToPageData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesAddLanguageToPageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`AddLanguageResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AddLanguageResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: AddLanguageResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.pagesCreatePage

> **xmc.agent.pagesCreatePage**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:203](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L203)

Creates a new page in the specified location with the given template, fields, and language. The page is created as a child of the specified parent page.

#### params

> **params**: `Options`\<[`PagesCreatePageData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesCreatePageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`CreatePageResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/CreatePageResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: CreatePageResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.pagesSetComponentDatasource

> **xmc.agent.pagesSetComponentDatasource**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:221](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L221)

Set component datasource

#### params

> **params**: `Options`\<[`PagesSetComponentDatasourceData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesSetComponentDatasourceData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SetComponentDatasourceResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SetComponentDatasourceResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: SetComponentDatasourceResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.agent.personalizationCreatePersonalizationVersion

> **xmc.agent.personalizationCreatePersonalizationVersion**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:263](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L263)

Creates a new personalization definition with one or more variants.

#### params

> **params**: `Options`\<[`PersonalizationCreatePersonalizationVersionData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PersonalizationCreatePersonalizationVersionData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`FlowDefinitionResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/FlowDefinitionResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: FlowDefinitionResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.authoring.graphql

> **xmc.authoring.graphql**: `object`

Defined in: [packages/xmc/src/client-authoring/augmentation.gen.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-authoring/augmentation.gen.ts#L13)

Send a GraphQL query or mutation request to the Sitecore Authoring API. Both queries and mutations are supported.

#### params

> **params**: `Options`\<[`GraphqlData`](../@sitecore-marketplace-sdk/namespaces/Authoring/type-aliases/GraphqlData.md), `boolean`\>

#### response

> **response**: \{ `data`: \{ `data?`: \{\[`key`: `string`\]: `unknown`; \}; `errors?`: `object`[]; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: \{ data?: \{ \[key: string\]: unknown; \} \| undefined; errors?: \{ message?: string \| undefined; locations?: \{ line?: number \| undefined; column?: number \| undefined; \}\[\] \| undefined; path?: string\[\] \| undefined; \}\[\] \| undefined; \}; error: undefined; \} \| \{ ...; \}) & \{ ...; \}

***

### xmc.contentTransfer.completeChunkSetTransfer

> **xmc.contentTransfer.completeChunkSetTransfer**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:54](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L54)

Marks the specified chunk set as complete for the given transfer.

#### params

> **params**: `Options`\<[`CompleteChunkSetTransferData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/CompleteChunkSetTransferData.md), `boolean`\>

#### response

> **response**: \{ `data`: \{ `ContentTransferFileName`: `string`; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: \{ ContentTransferFileName: string; \}; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.contentTransfer.createContentTransfer

> **xmc.contentTransfer.createContentTransfer**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:42](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L42)

Creates a new transfer in the Source environment.

#### params

> **params**: `Options`\<[`CreateContentTransferData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/CreateContentTransferData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: unknown; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.contentTransfer.deleteContentTransfer

> **xmc.contentTransfer.deleteContentTransfer**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:60](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L60)

Deletes the content transfer by transfer ID. Starts a clean-up of all resources related to content transfer in Source or Target environments.

#### params

> **params**: `Options`\<[`DeleteContentTransferData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/DeleteContentTransferData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: unknown; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.contentTransfer.saveChunk

> **xmc.contentTransfer.saveChunk**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:48](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L48)

Saves the specified chunk from the specified chunk set in the Target environment.

#### params

> **params**: `Options`\<[`SaveChunkData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/SaveChunkData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: unknown; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.live.graphql

> **xmc.live.graphql**: `object`

Defined in: [packages/xmc/src/client-content/augmentation.gen.ts:19](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content/augmentation.gen.ts#L19)

Send a GraphQL query request to the Sitecore GraphQL API. Mutations are not supported by the Preview API and Delivery API.

#### params

> **params**: `Options`\<[`GraphqlData`](../@sitecore-marketplace-sdk/namespaces/Content/type-aliases/GraphqlData.md), `boolean`\>

#### response

> **response**: \{ `data`: \{ `data?`: \{\[`key`: `string`\]: `unknown`; \}; `errors?`: `object`[]; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: \{ data?: \{ \[key: string\]: unknown; \} \| undefined; errors?: \{ message?: string \| undefined; locations?: \{ line?: number \| undefined; column?: number \| undefined; \}\[\] \| undefined; path?: string\[\] \| undefined; \}\[\] \| undefined; \}; error: undefined; \}) & \{ ...; \}

***

### xmc.preview.graphql

> **xmc.preview.graphql**: `object`

Defined in: [packages/xmc/src/client-content/augmentation.gen.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content/augmentation.gen.ts#L13)

Send a GraphQL query request to the Sitecore GraphQL API. Mutations are not supported by the Preview API and Delivery API.

#### params

> **params**: `Options`\<[`GraphqlData`](../@sitecore-marketplace-sdk/namespaces/Content/type-aliases/GraphqlData.md), `boolean`\>

#### response

> **response**: \{ `data`: \{ `data?`: \{\[`key`: `string`\]: `unknown`; \}; `errors?`: `object`[]; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: \{ data?: \{ \[key: string\]: unknown; \} \| undefined; errors?: \{ message?: string \| undefined; locations?: \{ line?: number \| undefined; column?: number \| undefined; \}\[\] \| undefined; path?: string\[\] \| undefined; \}\[\] \| undefined; \}; error: undefined; \}) & \{ ...; \}

***

### xmc.xmapp.addFavoriteSite

> **xmc.xmapp.addFavoriteSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:208](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L208)

Adds a site to your list of favorites

#### params

> **params**: `Options`\<[`AddFavoriteSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/AddFavoriteSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.aggregateLivePageVariants

> **xmc.xmapp.aggregateLivePageVariants**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:214](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L214)

Returns currently active personalization variants for the requested pages.

#### params

> **params**: `Options`\<[`AggregateLivePageVariantsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/AggregateLivePageVariantsData.md), `boolean`\> \| `undefined`

#### response

> **response**: \{ `data`: [`PageVariantsAggregationResponse`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/PageVariantsAggregationResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: PageVariantsAggregationResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.aggregatePageData

> **xmc.xmapp.aggregatePageData**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:220](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L220)

Aggregates data about multiple pages and their components.

#### params

> **params**: `Options`\<[`AggregatePageDataData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/AggregatePageDataData.md), `boolean`\> \| `undefined`

#### response

> **response**: \{ `data`: [`PagesAggregationResponse`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/PagesAggregationResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: PagesAggregationResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.copySite

> **xmc.xmapp.copySite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:293](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L293)

You can create a site by duplicating an existing one. When you duplicate a site, its content items (such as pages and images, folder structure, and links) are copied. Most of the settings are also copied, but you can change those later. The new site's path parameters and response body schema will be the same as the original site.

#### params

> **params**: `Options`\<[`CopySiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/CopySiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.createCollection

> **xmc.xmapp.createCollection**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:190](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L190)

Creates a collection by specifying a name and, optionally, a display name and description.

#### params

> **params**: `Options`\<[`CreateCollectionData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/CreateCollectionData.md), `boolean`\> \| `undefined`

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.createHost

> **xmc.xmapp.createHost**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:329](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L329)

Creates a host for a site.

#### params

> **params**: `Options`\<[`CreateHostData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/CreateHostData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Host`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Host.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Host; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.createLanguage

> **xmc.xmapp.createLanguage**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:184](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L184)

Adds a language to your environment, so you can create content and build websites in that language. You can choose from the language supported by Sitecore XM Cloud. If you do not know the language code of the language, first retrieve the list of languages supported in Sitecore XM Cloud.
           To add a language to the system, you must provide the language code. You can optionally input additional parameters, such as region code and spell checker.
           If you want to add a custom language not in the default cultures, register it as a custom culture (as described in .NET CultureInfo class) and update the LanguageDefinitions.config file.

#### params

> **params**: `Options`\<[`CreateLanguageData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/CreateLanguageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Language`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Language.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Language; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.createSite

> **xmc.xmapp.createSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:272](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L272)

[Creates a site](https://doc.sitecore.com/xmc/en/users/xm-cloud/create-a-site.html) for the environment.
           Sites are created using  [site templates](https://doc.sitecore.com/xmc/en/developers/xm-cloud/create-a-site-template-for-the-xm-cloud-dashboard.html). Every site belongs to a [site collection](https://doc.sitecore.com/xmc/en/users/xm-cloud/create-a-site-collection.html). You can either create a site inside an existing collection or create a new one.
           It is also possible to create a site by duplicating a site.

#### params

> **params**: `Options`\<[`CreateSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/CreateSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.deleteCollection

> **xmc.xmapp.deleteCollection**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:196](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L196)

Deletes a site collection, including sites in that collection.

#### params

> **params**: `Options`\<[`DeleteCollectionData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/DeleteCollectionData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.deleteHost

> **xmc.xmapp.deleteHost**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:335](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L335)

Deletes a site using a hostID. Deletes a site, including its pages, settings, media files, data sources, presentation elements, dictionaries, components, variants, and page designs. Everyone in the environment will lose access to the deleted site.

#### params

> **params**: `Options`\<[`DeleteHostData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/DeleteHostData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: ProblemDetails; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.deleteLanguage

> **xmc.xmapp.deleteLanguage**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:251](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L251)

Deletes a language from the XM Cloud environment.
           To delete a language from the system, you must provide the regional ISO code of the language. If you do not know the ISO code of the language, first retrieve the list of languages added to the environment.

#### params

> **params**: `Options`\<[`DeleteLanguageData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/DeleteLanguageData.md), `boolean`\>

#### response

> **response**: \{ `data`: `boolean`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: boolean; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.deleteSite

> **xmc.xmapp.deleteSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:281](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L281)

Deletes a site, including its pages, settings, media files, data sources, presentation elements, dictionaries, components, variants, and page designs. Everyone in the environment will lose access to the deleted site.
          Deleting a site affects related websites in the collection:
          • If the site [shares](https://doc.sitecore.com/xmc/en/users/xm-cloud/create-a-site.html#share-a-site) items with other sites, this might result in broken links.
          • Items that are cloned to other sites are turned into regular items, and the links removed.

#### params

> **params**: `Options`\<[`DeleteSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/DeleteSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.detachAnalyticsIdentifier

> **xmc.xmapp.detachAnalyticsIdentifier**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:323](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L323)

Removes the analytics identifiers from one or more sites.

#### params

> **params**: `Options`\<[`DetachAnalyticsIdentifierData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/DetachAnalyticsIdentifierData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: ProblemDetails; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.removeFavoriteSite

> **xmc.xmapp.removeFavoriteSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:264](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L264)

Removes a site from your list of favorites

#### params

> **params**: `Options`\<[`RemoveFavoriteSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RemoveFavoriteSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: ProblemDetails; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.renameCollection

> **xmc.xmapp.renameCollection**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:226](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L226)

Changes the system name of a site collection.

#### params

> **params**: `Options`\<[`RenameCollectionData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RenameCollectionData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.renameSite

> **xmc.xmapp.renameSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:299](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L299)

Changes the system name of a site.

#### params

> **params**: `Options`\<[`RenameSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RenameSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.sortCollections

> **xmc.xmapp.sortCollections**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:232](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L232)

By assigning a sort value to site collection IDs, you can use this endpoint to apply an order by which collections are sorted in the Sites user interface and in Content Editor. The lower the sort value, the higher the site appears in the interface.

#### params

> **params**: `Options`\<[`SortCollectionsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SortCollectionsData.md), `boolean`\>

#### response

> **response**: \{ `data`: `void`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: void; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.sortSites

> **xmc.xmapp.sortSites**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:305](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L305)

By assigning a sort value to site IDs, you can use this endpoint to apply an order by which sites are sorted in the Sites user interface and in Content Editor. The lower the sort value, the higher the site appears in the interface.

#### params

> **params**: `Options`\<[`SortSitesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SortSitesData.md), `boolean`\>

#### response

> **response**: \{ `data`: `void`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: void; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.updateCollection

> **xmc.xmapp.updateCollection**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:202](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L202)

Updates the display name and the description of the site collection. To change the system name of a collection, see [rename a site collection](#tag/Collections/operation/Rename).

#### params

> **params**: `Options`\<[`UpdateCollectionData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UpdateCollectionData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SiteCollection`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SiteCollection.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SiteCollection; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.updateHost

> **xmc.xmapp.updateHost**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:341](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L341)

Modifies the properties of a host.

#### params

> **params**: `Options`\<[`UpdateHostData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UpdateHostData.md), `boolean`\>

#### response

> **response**: \{ `data`: `void`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: void; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.updateLanguage

> **xmc.xmapp.updateLanguage**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:258](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L258)

Updates a [language supported](https://doc.sitecore.com/xmc/en/users/xm-cloud/add-a-language-to-your-xm-cloud-environment.html#add-a-custom-language) by Sitecore XM Cloud.
           To update a language, you must provide the regional ISO code of the language. If you do not know the ISO code of the language, first retrieve the list of languages supported in Sitecore XM Cloud.

#### params

> **params**: `Options`\<[`UpdateLanguageData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UpdateLanguageData.md), `boolean`\>

#### response

> **response**: \{ `data`: `void`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: void; error: undefined; \} \| \{ data: undefined; error: UpdateLanguageError; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.updateSite

> **xmc.xmapp.updateSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:287](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L287)

Updates various parameters of a site. To change the name of a site, see [rename a site](#tag/Sites/operation/Rename).

#### params

> **params**: `Options`\<[`UpdateSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UpdateSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Site`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Site.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Site; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.updateSitemapConfiguration

> **xmc.xmapp.updateSitemapConfiguration**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:353](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L353)

Updates a [sitemap](https://doc.sitecore.com/xmc/en/developers/xm-cloud/configure-a-sitemap.html) configuration.

#### params

> **params**: `Options`\<[`UpdateSitemapConfigurationData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UpdateSitemapConfigurationData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SitemapConfiguration`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SitemapConfiguration.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SitemapConfiguration; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.uploadSiteThumbnail

> **xmc.xmapp.uploadSiteThumbnail**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:347](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L347)

Uploads an image to be used as [thumbnail](https://doc.sitecore.com/xmc/en/users/ea-xm-cloud/manage-sites.html#manage-general-site-settings) for a site when it is displayed in the [XM Cloud Sites application](https://doc.sitecore.com/xmc/en/users/xm-cloud/sites.html).

#### params

> **params**: `Options`\<[`UploadSiteThumbnailData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UploadSiteThumbnailData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`UploadMediaOutput`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/UploadMediaOutput.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: UploadMediaOutput; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.validateCollectionName

> **xmc.xmapp.validateCollectionName**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:244](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L244)

Validates a site collection name to ensure it meets the required criteria. The validations applied to the collection name:
- Is a string and can't be null.
- Is unique.
- The length of the name is a maximum of 50 characters.
- Can't start or end with a space.
- Can't start with a dash.
- Can include Latin alphanumeric characters, spaces and dashes.

#### params

> **params**: `Options`\<[`ValidateCollectionNameData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ValidateCollectionNameData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`NameValidationResult`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/NameValidationResult.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: NameValidationResult; error: undefined; \}) & \{ request: Request; response: Response; \}

***

### xmc.xmapp.validateSiteName

> **xmc.xmapp.validateSiteName**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:317](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L317)

Validates a site name to ensure it meets the required criteria. The validations applied to the site name:
- Is a string and can't be null.
- Is unique.
- The length of the name is a maximum of 50 characters.
- Can't start or end with a space.
- Can't start with a dash.
- Can include Latin alphanumeric characters, spaces and dashes.

#### params

> **params**: `Options`\<[`ValidateSiteNameData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ValidateSiteNameData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`NameValidationResult`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/NameValidationResult.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: NameValidationResult; error: undefined; \}) & \{ request: Request; response: Response; \}
