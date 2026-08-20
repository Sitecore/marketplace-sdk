[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Search](../README.md) / Schedule

# Type Alias: Schedule

> **Schedule** = `object`

Defined in: [packages/xmc/src/client-search/types.gen.ts:69](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L69)

## Properties

### dayOfMonth?

> `optional` **dayOfMonth?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:73](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L73)

1–31; required for monthly

***

### dayOfWeek?

> `optional` **dayOfWeek?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:77](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L77)

0=Sun … 6=Sat; required for weekly

***

### hour?

> `optional` **hour?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:81](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L81)

0–23; required for daily, weekly, monthly

***

### intervalHours?

> `optional` **intervalHours?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:85](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L85)

Required for interval; must be greater than zero

***

### minute?

> `optional` **minute?**: `number`

Defined in: [packages/xmc/src/client-search/types.gen.ts:89](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L89)

0–59; required for hourly, daily, weekly, monthly

***

### startsAt?

> `optional` **startsAt?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:97](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L97)

StartsAt is the earliest time a run is allowed. Past values are fine —
for intervals they're the anchor the schedule counts from. We only reject
a zero/empty time (a real past or future timestamp is always ok).
Example (calendar): daily at 09:00, StartsAt=2026-08-01 → first run is Aug 1 at 09:00, not earlier.
Example (interval): StartsAt=2024-01-01T00:00Z, every 6h → …00:00, 06:00, 12:00…; after Jul 22 10:00 → next is 12:00.

***

### timezone?

> `optional` **timezone?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:98](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L98)

***

### type?

> `optional` **type?**: `string`

Defined in: [packages/xmc/src/client-search/types.gen.ts:99](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-search/types.gen.ts#L99)
