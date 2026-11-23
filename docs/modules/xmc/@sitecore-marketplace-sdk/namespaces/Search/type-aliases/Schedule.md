[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Search](../README.md) / Schedule

# Type Alias: Schedule

> **Schedule** = `object`

Defined in: [packages/xmc/src/client-search/types.gen.ts:71](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L71)

## Properties

### dayOfMonth?

> `optional` **dayOfMonth?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:75](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L75)

1–31; required for monthly

***

### dayOfWeek?

> `optional` **dayOfWeek?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:79](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L79)

0=Sun … 6=Sat; required for weekly

***

### hour?

> `optional` **hour?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:83](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L83)

0–23; required for daily, weekly, monthly

***

### intervalHours?

> `optional` **intervalHours?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:87](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L87)

Required for interval; must be greater than zero

***

### minute?

> `optional` **minute?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:91](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L91)

0–59; required for hourly, daily, weekly, monthly

***

### startsAt?

> `optional` **startsAt?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:99](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L99)

StartsAt is the earliest time a run is allowed. Past values are fine —
for intervals they're the anchor the schedule counts from. We only reject
a zero/empty time (a real past or future timestamp is always ok).
Example (calendar): daily at 09:00, StartsAt=2026-08-01 → first run is Aug 1 at 09:00, not earlier.
Example (interval): StartsAt=2024-01-01T00:00Z, every 6h → …00:00, 06:00, 12:00…; after Jul 22 10:00 → next is 12:00.

***

### timezone?

> `optional` **timezone?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:100](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L100)

***

### type?

> `optional` **type?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:101](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L101)
