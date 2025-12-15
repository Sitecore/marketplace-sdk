[**@sitecore-marketplace-sdk/xmc**](../README.md)

***

[@sitecore-marketplace-sdk/xmc](../README.md) / QueryMap

# Interface: QueryMap

Defined in: packages/client/dist/sdk-types.d.ts:178

## Properties

### application.context

> **context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:194

#### params

> **params**: `void`

#### response

> **response**: `ApplicationContext`

#### subscribe

> **subscribe**: `false`

***

### host.route

> **route**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:204

#### params

> **params**: `void`

#### response

> **response**: `string`

#### subscribe

> **subscribe**: `false`

***

### host.state

> **state**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:184

#### params

> **params**: `void`

#### response

> **response**: `null` \| `XmcXmAppsHostState` \| `XmcPagesContextViewHostState`

#### subscribe

> **subscribe**: `true`

***

### host.user

> **user**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:179

#### params

> **params**: `void`

#### response

> **response**: `UserInfo`

#### subscribe

> **subscribe**: `false`

***

### pages.context

> **context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:189

#### params

> **params**: `void`

#### response

> **response**: `PagesContext`

#### subscribe

> **subscribe**: `true`

***

### site.context

> **context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:199

#### params

> **params**: `void`

#### response

> **response**: `SiteContext`

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.assetsGetAssetInformation

> **assetsGetAssetInformation**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:149](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L149)

Retrieves detailed information about a specific digital asset including its metadata, file properties, and usage information.

#### params

> **params**: `Options`\<[`AssetsGetAssetInformationData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AssetsGetAssetInformationData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`AssetInformationResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AssetInformationResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: AssetInformationResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.assetsSearchAssets

> **assetsSearchAssets**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:142](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L142)

Searches for digital assets based on query terms, file types, or tags. Returns a list of matching assets with their metadata and download URLs.

#### params

> **params**: `undefined` \| `Options`\<[`AssetsSearchAssetsData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AssetsSearchAssetsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`AssetSearchResultModel`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/AssetSearchResultModel.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: AssetSearchResultModel\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.componentsGetComponent

> **componentsGetComponent**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:135](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L135)

Retrieves detailed information about a specific component including its fields, datasource requirements, and configuration options.

#### params

> **params**: `Options`\<[`ComponentsGetComponentData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentsGetComponentData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ComponentResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ComponentResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.componentsListComponents

> **componentsListComponents**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:128](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L128)

Retrieves a list of all available components for a specific site. This includes both built-in components and custom components that can be used in pages.

#### params

> **params**: `Options`\<[`ComponentsListComponentsData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentsListComponentsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ComponentsResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentsResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ComponentsResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.componentsSearchComponentDatasources

> **componentsSearchComponentDatasources**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:121](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L121)

Searches for available datasources that can be used with a specific component. This helps find existing content items that can serve as datasources.

#### params

> **params**: `Options`\<[`ComponentsSearchComponentDatasourcesData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentsSearchComponentDatasourcesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SearchResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SearchResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: SearchResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.contentGetContentItemById

> **contentGetContentItemById**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:100](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L100)

Retrieves detailed information about a specific content item using its unique identifier.

#### params

> **params**: `Options`\<[`ContentGetContentItemByIdData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentGetContentItemByIdData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ContentItemResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentItemResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ContentItemResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.contentGetContentItemByPath

> **contentGetContentItemByPath**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:107](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L107)

Retrieves detailed information about a content item using its path in the content tree.

#### params

> **params**: `Options`\<[`ContentGetContentItemByPathData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentGetContentItemByPathData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ContentItemResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentItemResponse.md) \| \{[`key`: `string`]: `unknown`; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ContentItemResponse \| \{ \[key: string\]: unknown; \}; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.contentListAvailableInsertoptions

> **contentListAvailableInsertoptions**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:114](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L114)

Retrieves the available content templates that can be inserted as child items under the specified parent item.

#### params

> **params**: `Options`\<[`ContentListAvailableInsertoptionsData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ContentListAvailableInsertoptionsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`InsertOptionModel`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/InsertOptionModel.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: InsertOptionModel\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.environmentsListLanguages

> **environmentsListLanguages**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:156](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L156)

Retrieves all languages available.

#### params

> **params**: `undefined` \| `Options`\<[`EnvironmentsListLanguagesData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/EnvironmentsListLanguagesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`LanguageModel`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/LanguageModel.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: LanguageModel\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.jobsGetJob

> **jobsGetJob**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:184](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L184)

Retrieves the details of the specified job.

#### params

> **params**: `Options`\<[`JobsGetJobData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/JobsGetJobData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.jobsListOperations

> **jobsListOperations**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:191](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L191)

Retrieves the operations associated with the specified job.

#### params

> **params**: `Options`\<[`JobsListOperationsData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/JobsListOperationsData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetAllowedComponentsByPlaceholder

> **pagesGetAllowedComponentsByPlaceholder**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:93](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L93)

Retrieves a list of components that are allowed to be added to a specific placeholder on a page. This helps ensure only compatible components are added to each placeholder. You can use * to fetch all components.

#### params

> **params**: `Options`\<[`PagesGetAllowedComponentsByPlaceholderData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetAllowedComponentsByPlaceholderData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ComponentShortInfo`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ComponentShortInfo.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ComponentShortInfo\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetComponentsOnPage

> **pagesGetComponentsOnPage**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L37)

Retrieves a list of components that are currently added to a specific page.

#### params

> **params**: `Options`\<[`PagesGetComponentsOnPageData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetComponentsOnPageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`GetPageComponentsResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/GetPageComponentsResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: GetPageComponentsResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetPage

> **pagesGetPage**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:86](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L86)

Retrieves comprehensive information about a page including its layout, components, placeholders, and available actions. This endpoint provides all the information needed to understand and modify a page.

#### params

> **params**: `Options`\<[`PagesGetPageData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetPageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`GetPageResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/GetPageResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: GetPageResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetPageHtml

> **pagesGetPageHtml**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:65](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L65)

Retrieves the HTML content of a specific page. This endpoint returns the raw HTML of the page as it would appear in the browser.

#### params

> **params**: `Options`\<[`PagesGetPageHtmlData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetPageHtmlData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageHtmlResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PageHtmlResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PageHtmlResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetPagePathByLiveUrl

> **pagesGetPagePathByLiveUrl**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L51)

Get the page item path corresponding to a live URL. You can use this endpoint to find the page item that corresponds to a specific live URL on your website.

#### params

> **params**: `Options`\<[`PagesGetPagePathByLiveUrlData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetPagePathByLiveUrlData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PagePathByLiveUrlResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagePathByLiveUrlResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PagePathByLiveUrlResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetPagePreviewUrl

> **pagesGetPagePreviewUrl**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:72](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L72)

Retrieves the preview URL of a specific page. This endpoint returns the URL that can be used to preview the page.

#### params

> **params**: `Options`\<[`PagesGetPagePreviewUrlData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetPagePreviewUrlData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`GetPagePreviewUrlResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/GetPagePreviewUrlResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: GetPagePreviewUrlResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetPageScreenshot

> **pagesGetPageScreenshot**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:58](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L58)

Captures and returns a screenshot of the specified page. This endpoint takes a screenshot of the live page and returns it as a base64-encoded image.

#### params

> **params**: `Options`\<[`PagesGetPageScreenshotData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetPageScreenshotData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageScreenshotResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PageScreenshotResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PageScreenshotResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesGetPageTemplateById

> **pagesGetPageTemplateById**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:79](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L79)

Retrieves detailed information about a specific page template, including its fields and settings. Use this endpoint to understand the structure and available fields of a template before creating pages.

#### params

> **params**: `Options`\<[`PagesGetPageTemplateByIdData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesGetPageTemplateByIdData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageTemplateResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PageTemplateResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PageTemplateResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.pagesSearchSite

> **pagesSearchSite**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L44)

Searches all pages in a specific site by title or content. The response returns the matching pages with their details including id, path, display_name, and search_fields.

#### params

> **params**: `Options`\<[`PagesSearchSiteData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PagesSearchSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageSearchItemModel`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PageSearchItemModel.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PageSearchItemModel\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.personalizationGetConditionTemplateById

> **personalizationGetConditionTemplateById**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:177](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L177)

Returns a condition template by ID and its parameters for creating a personalization variant on a page

#### params

> **params**: `Options`\<[`PersonalizationGetConditionTemplateByIdData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PersonalizationGetConditionTemplateByIdData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ConditionTemplate`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ConditionTemplate.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ConditionTemplate; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.personalizationGetConditionTemplates

> **personalizationGetConditionTemplates**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:170](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L170)

Retrieves all available condition templates for personalization.

#### params

> **params**: `undefined` \| `Options`\<[`PersonalizationGetConditionTemplatesData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PersonalizationGetConditionTemplatesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ConditionTemplate`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ConditionTemplate.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: ConditionTemplate\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.personalizationGetPersonalizationVersionsByPage

> **personalizationGetPersonalizationVersionsByPage**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L163)

Retrieves all personalization versions configured for a specific page, including their targeting rules and content variations.

#### params

> **params**: `Options`\<[`PersonalizationGetPersonalizationVersionsByPageData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PersonalizationGetPersonalizationVersionsByPageData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PersonalizationVariantDetailModel`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PersonalizationVariantDetailModel.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PersonalizationVariantDetailModel\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.sitesGetAllPagesBySite

> **sitesGetAllPagesBySite**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L23)

Returns a flat list of routes for the specified site and language, each with id and path.

#### params

> **params**: `Options`\<[`SitesGetAllPagesBySiteData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SitesGetAllPagesBySiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageModel`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/PageModel.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: PageModel\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.sitesGetSiteDetails

> **sitesGetSiteDetails**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L16)

Retrieves detailed information about a specific site including its configuration, themes, and available languages.

#### params

> **params**: `Options`\<[`SitesGetSiteDetailsData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SitesGetSiteDetailsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SiteInformationResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SiteInformationResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: SiteInformationResponse; error: undefined; \} \| \{ data: undefined; error: HttpValidationError; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.sitesGetSiteIdFromItem

> **sitesGetSiteIdFromItem**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L30)

Returns the site root item ID for a given item by traversing ancestors to find the site root template

#### params

> **params**: `Options`\<[`SitesGetSiteIdFromItemData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SitesGetSiteIdFromItemData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SiteIdFromItemResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SiteIdFromItemResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: HttpValidationError; \} \| \{ data: SiteIdFromItemResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.agent.sitesGetSitesList

> **sitesGetSitesList**: `object`

Defined in: [packages/xmc/src/client-agent/augmentation.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/augmentation.gen.ts#L9)

Retrieves a list of all available sites with their basic information and configuration.

#### params

> **params**: `undefined` \| `Options`\<[`SitesGetSitesListData`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/SitesGetSitesListData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`ListSitesResponse`](../@sitecore-marketplace-sdk/namespaces/Agent/type-aliases/ListSitesResponse.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: ListSitesResponse; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.contentTransfer.consumeFile

> **consumeFile**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L23)

Starts consuming a `.raif` file in the specified database.

#### params

> **params**: `Options`\<[`ConsumeFileData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/ConsumeFileData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: unknown; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.contentTransfer.getBlobState

> **getBlobState**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L30)

Retrieves the status of a consumed `.raif` file.

#### params

> **params**: `Options`\<[`GetBlobStateData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/GetBlobStateData.md), `boolean`\>

#### response

> **response**: \{ `data`: \{ `details?`: \{[`key`: `string`]: `unknown`; \}; `status?`: `string`; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: \{ status?: string \| undefined; details?: \{ \[key: string\]: unknown; \} \| undefined; \}; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.contentTransfer.getChunk

> **getChunk**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L16)

Retrieves the specified chunk from the specified chunk set in the Source environment.

#### params

> **params**: `Options`\<[`GetChunkData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/GetChunkData.md), `boolean`\>

#### response

> **response**: \{ `data`: `Blob` \| `File`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: Blob \| File; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.contentTransfer.getContentTransferStatus

> **getContentTransferStatus**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L9)

Gets the status of the created content transfer by transfer ID.

#### params

> **params**: `Options`\<[`GetContentTransferStatusData`](../@sitecore-marketplace-sdk/namespaces/ContentTransfer/type-aliases/GetContentTransferStatusData.md), `boolean`\>

#### response

> **response**: \{ `data`: \{ `ChunkSetsMetadata`: `object`[]; `State`: `string`; \}; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: unknown; \} \| \{ data: \{ State: string; ChunkSetsMetadata: \{ ChunkSetId: string; ChunkCount: number; TotalItemCount: number; \}\[\]; \}; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.getFavoriteSites

> **getFavoriteSites**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L51)

Fetches a list of your favorite sites

#### params

> **params**: `undefined` \| `Options`\<[`GetFavoriteSitesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/GetFavoriteSitesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Site`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Site.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Site\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.getLivePageState

> **getLivePageState**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L30)

Checks if the requested page is active.

#### params

> **params**: `Options`\<[`GetLivePageStateData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/GetLivePageStateData.md), `boolean`\>

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: ProblemDetails; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.getRenderingHosts

> **getRenderingHosts**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:142](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L142)

Fetches a list of rendering hosts for a site.

#### params

> **params**: `Options`\<[`GetRenderingHostsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/GetRenderingHostsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`RenderingHost`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RenderingHost.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: RenderingHost\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listCollections

> **listCollections**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L37)

Fetches the list of site collections in the environment, with associated details.

#### params

> **params**: `undefined` \| `Options`\<[`ListCollectionsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListCollectionsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SiteCollection`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SiteCollection.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SiteCollection\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listCollectionSites

> **listCollectionSites**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:93](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L93)

Fetches a list of sites in a site collection.

#### params

> **params**: `Options`\<[`ListCollectionSitesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListCollectionSitesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Site`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Site.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Site\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listHosts

> **listHosts**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:128](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L128)

Retrieves the list of hosts for a site.

#### params

> **params**: `Options`\<[`ListHostsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListHostsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Host`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Host.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Host\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listJobs

> **listJobs**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:58](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L58)

Fetches information about background jobs. Returns empty array if no jobs are running.

#### params

> **params**: `undefined` \| `Options`\<[`ListJobsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListJobsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Job`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Job.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Job\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listLanguages

> **listLanguages**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L9)

Retrieves the list of languages added to the environment.

#### params

> **params**: `undefined` \| `Options`\<[`ListLanguagesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListLanguagesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Language`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Language.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: Language\[\]; error: undefined; \} \| \{ data: undefined; error: ProblemDetails; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listPageAncestors

> **listPageAncestors**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:114](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L114)

Fetches information about the ancestors of a page.

#### params

> **params**: `Options`\<[`ListPageAncestorsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListPageAncestorsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageResponse`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/PageResponse.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: PageResponse\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listPageChildren

> **listPageChildren**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:121](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L121)

Fetches information about the children of a page.

#### params

> **params**: `Options`\<[`ListPageChildrenData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListPageChildrenData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageResponse`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/PageResponse.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: PageResponse\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listPageVariants

> **listPageVariants**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L23)

Fetches the identifiers of currently active personalization variants for a page.

#### params

> **params**: `Options`\<[`ListPageVariantsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListPageVariantsData.md), `boolean`\>

#### response

> **response**: \{ `data`: `string`[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: string\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listSites

> **listSites**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:72](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L72)

Fetches the list of sites in the environment, with associated details.

#### params

> **params**: `undefined` \| `Options`\<[`ListSitesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListSitesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Site`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Site.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Site\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listSiteTemplates

> **listSiteTemplates**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:149](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L149)

Gets the site templates available in the environment that can be used for creating sites. Learn more about [site templates](https://doc.sitecore.com/xmc/en/developers/xm-cloud/create-a-site-template-for-the-xm-cloud-dashboard.html).

#### params

> **params**: `undefined` \| `Options`\<[`ListSiteTemplatesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListSiteTemplatesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SiteTemplate`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SiteTemplate.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SiteTemplate\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listSupportedLanguages

> **listSupportedLanguages**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L16)

Retrieves the list of languages supported by Sitecore XM Cloud, and associated data.

#### params

> **params**: `undefined` \| `Options`\<[`ListSupportedLanguagesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListSupportedLanguagesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SupportedLanguage`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SupportedLanguage.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SupportedLanguage\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.listTrackedSites

> **listTrackedSites**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:86](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L86)

Fetches a list of sites that use an [analytics identifier](https://doc.sitecore.com/xmc/en/users/xm-cloud/manage-personalization-and-analytics-for-sites.html).

#### params

> **params**: `Options`\<[`ListTrackedSitesData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/ListTrackedSitesData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Site`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Site.md)[]; `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Site\[\]; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveCollection

> **retrieveCollection**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L44)

Fetches information about a site collection.

#### params

> **params**: `Options`\<[`RetrieveCollectionData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveCollectionData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SiteCollection`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SiteCollection.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SiteCollection; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveHost

> **retrieveHost**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:135](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L135)

Fetches details about a site host.

#### params

> **params**: `Options`\<[`RetrieveHostData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveHostData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Host`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Host.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Host; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveJob

> **retrieveJob**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:65](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L65)

Fetches information about a background job.

#### params

> **params**: `Options`\<[`RetrieveJobData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveJobData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Job`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Job.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Job; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveLocalizationStatistics

> **retrieveLocalizationStatistics**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:156](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L156)

Fetches localization statistics for a site, including the number of pages in each locale.

#### params

> **params**: `Options`\<[`RetrieveLocalizationStatisticsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveLocalizationStatisticsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`LocalizationStatistics`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/LocalizationStatistics.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: LocalizationStatistics; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrievePageHierarchy

> **retrievePageHierarchy**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:107](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L107)

Fetches hierarchy information about a page, including its children, ancestors, and siblings.

#### params

> **params**: `Options`\<[`RetrievePageHierarchyData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrievePageHierarchyData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageHierarchy`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/PageHierarchy.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: PageHierarchy; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveSite

> **retrieveSite**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:79](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L79)

Fetches information about a site.

#### params

> **params**: `Options`\<[`RetrieveSiteData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveSiteData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`Site`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/Site.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: Site; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveSiteHierarchy

> **retrieveSiteHierarchy**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:100](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L100)

Fetches hierarchy information about the main page of a site, including its children, ancestors, and siblings.

#### params

> **params**: `Options`\<[`RetrieveSiteHierarchyData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveSiteHierarchyData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`PageHierarchy`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/PageHierarchy.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: PageHierarchy; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveSitemapConfiguration

> **retrieveSitemapConfiguration**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L163)

Fetches a [sitemap](https://doc.sitecore.com/xmc/en/developers/xm-cloud/configure-a-sitemap.html) configuration.

#### params

> **params**: `Options`\<[`RetrieveSitemapConfigurationData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveSitemapConfigurationData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`SitemapConfiguration`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/SitemapConfiguration.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: SitemapConfiguration; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### xmc.xmapp.retrieveWorkflowStatistics

> **retrieveWorkflowStatistics**: `object`

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:170](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/augmentation.gen.ts#L170)

Fetches the workflows defined for a site, their states, and the number of pages in each state.

#### params

> **params**: `Options`\<[`RetrieveWorkflowStatisticsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveWorkflowStatisticsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`WorkflowsStatistics`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/WorkflowsStatistics.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: WorkflowsStatistics; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`
