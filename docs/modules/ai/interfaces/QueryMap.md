[**@sitecore-marketplace-sdk/ai**](../README.md)

***

[@sitecore-marketplace-sdk/ai](../README.md) / QueryMap

# Interface: QueryMap

Defined in: packages/client/dist/sdk-types.d.ts:220

## Properties

### ai.skills.getVersion

> **ai.skills.getVersion**: `object`

Defined in: [packages/ai/src/client-skills/augmentation.gen.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/ai/src/client-skills/augmentation.gen.ts#L9)

Get Version

#### params

> **params**: `Options`\<[`GetVersionData`](../@sitecore-marketplace-sdk/namespaces/Skills/type-aliases/GetVersionData.md), `boolean`\> \| `undefined`

#### response

> **response**: \{ `data`: `unknown`; `request`: `Request`; `response`: `Response`; \} \| (\{ data: unknown; error: undefined; \} \| \{ data: undefined; error: unknown; \}) & \{ request: Request; response: Response; \}

#### subscribe

> **subscribe**: `false`

***

### application.context

> **application.context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:236

#### params

> **params**: `void`

#### response

> **response**: `ApplicationContext`

#### subscribe

> **subscribe**: `false`

***

### host.route

> **host.route**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:246

#### params

> **params**: `void`

#### response

> **response**: `string`

#### subscribe

> **subscribe**: `false`

***

### host.state

> **host.state**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:226

#### params

> **params**: `void`

#### response

> **response**: `XmcXmAppsHostState` \| `XmcPagesContextViewHostState` \| `null`

#### subscribe

> **subscribe**: `true`

***

### host.user

> **host.user**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:221

#### params

> **params**: `void`

#### response

> **response**: `UserInfo`

#### subscribe

> **subscribe**: `false`

***

### pages.context

> **pages.context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:231

#### params

> **params**: `void`

#### response

> **response**: `PagesContext`

#### subscribe

> **subscribe**: `true`

***

### site.context

> **site.context**: `object`

Defined in: packages/client/dist/sdk-types.d.ts:241

#### params

> **params**: `void`

#### response

> **response**: `SiteContext`

#### subscribe

> **subscribe**: `false`
