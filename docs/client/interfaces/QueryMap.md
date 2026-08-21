[**@sitecore-marketplace-sdk/client**](../README.md)

***

[@sitecore-marketplace-sdk/client](../README.md) / QueryMap

# Interface: QueryMap

Defined in: [packages/client/src/sdk-types.ts:265](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L265)

## Properties

### application.context

> **application.context**: `object`

Defined in: [packages/client/src/sdk-types.ts:283](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L283)

#### params

> **params**: `void`

#### response

> **response**: [`ApplicationContext`](ApplicationContext.md)

#### subscribe

> **subscribe**: `false`

***

### host.route

> **host.route**: `object`

Defined in: [packages/client/src/sdk-types.ts:293](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L293)

#### params

> **params**: `void`

#### response

> **response**: `string`

#### subscribe

> **subscribe**: `false`

***

### host.state

> **host.state**: `object`

Defined in: [packages/client/src/sdk-types.ts:271](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L271)

#### params

> **params**: `void`

#### response

> **response**: [`XmcXmAppsHostState`](XmcXmAppsHostState.md) \| [`XmcPagesContextViewHostState`](XmcPagesContextViewHostState.md) \| `null`

#### subscribe

> **subscribe**: `true`

***

### host.user

> **host.user**: `object`

Defined in: [packages/client/src/sdk-types.ts:266](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L266)

#### params

> **params**: `void`

#### response

> **response**: [`UserInfo`](UserInfo.md)

#### subscribe

> **subscribe**: `false`

***

### pages.context

> **pages.context**: `object`

Defined in: [packages/client/src/sdk-types.ts:278](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L278)

#### params

> **params**: `void`

#### response

> **response**: [`PagesContext`](PagesContext.md)

#### subscribe

> **subscribe**: `true`

***

### site.context

> **site.context**: `object`

Defined in: [packages/client/src/sdk-types.ts:288](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/client/src/sdk-types.ts#L288)

#### params

> **params**: `void`

#### response

> **response**: `SiteContext`

#### subscribe

> **subscribe**: `false`
