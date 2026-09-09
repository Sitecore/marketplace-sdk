[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / events

# Variable: events

> `const` **events**: `object`

Defined in: [events.ts:61](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L61)

Typed builders that set the wire `type` for you.
Pass the result to [AnalyticsClient.track](../interfaces/AnalyticsClient.md#track).

## Type Declaration

### appInvocation()

> **appInvocation**(`input`): [`AnalyticsEventInput`](../interfaces/AnalyticsEventInput.md)

Build an app invocation event (`mkp.telemetry.app.invocation`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`AppInvocationInput`](../interfaces/AppInvocationInput.md) | App id, installation id, and surface. |

#### Returns

[`AnalyticsEventInput`](../interfaces/AnalyticsEventInput.md)

### installClick()

> **installClick**(`input`): [`AnalyticsEventInput`](../interfaces/AnalyticsEventInput.md)

Build an install click event (`mkp.telemetry.listing.install_click`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`InstallClickInput`](../interfaces/InstallClickInput.md) | App id and optional CTA data. |

#### Returns

[`AnalyticsEventInput`](../interfaces/AnalyticsEventInput.md)

### listingView()

> **listingView**(`input`): [`AnalyticsEventInput`](../interfaces/AnalyticsEventInput.md)

Build a listing view event (`mkp.telemetry.listing.view`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`ListingViewInput`](../interfaces/ListingViewInput.md) | App id and optional catalogue data. |

#### Returns

[`AnalyticsEventInput`](../interfaces/AnalyticsEventInput.md)

## Example

```ts
analytics.track(events.listingView({ appId: 'app-42' }));
analytics.track(events.installClick({ appId: 'app-42', data: { cta: 'install' } }));
analytics.track(events.appInvocation({ appId: 'app-42', installationId: 'inst-7', surface: 'standalone' }));
```
