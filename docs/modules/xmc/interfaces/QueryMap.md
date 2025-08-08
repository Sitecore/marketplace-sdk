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

### xmc.contentTransfer.consumeFile

> **consumeFile**: `object`

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L23)

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

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L30)

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

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L16)

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

Defined in: [packages/xmc/src/client-content-transfer/augmentation.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/augmentation.gen.ts#L9)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:51](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L51)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L30)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:142](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L142)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L37)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:93](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L93)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:128](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L128)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:58](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L58)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L9)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:114](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L114)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:121](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L121)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L23)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:72](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L72)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:149](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L149)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:16](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L16)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:86](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L86)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L44)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:135](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L135)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:65](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L65)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:156](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L156)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:107](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L107)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:79](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L79)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:100](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L100)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L163)

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

Defined in: [packages/xmc/src/client-xmapp/augmentation.gen.ts:170](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/augmentation.gen.ts#L170)

Fetches the workflows defined for a site, their states, and the number of pages in each state.

#### params

> **params**: `Options`\<[`RetrieveWorkflowStatisticsData`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/RetrieveWorkflowStatisticsData.md), `boolean`\>

#### response

> **response**: \{ `data`: [`WorkflowsStatistics`](../@sitecore-marketplace-sdk/namespaces/Xmapp/type-aliases/WorkflowsStatistics.md); `request`: `Request`; `response`: `Response`; \} \| (\{ data: undefined; error: ProblemDetails; \} \| \{ data: WorkflowsStatistics; error: undefined; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`
