---
'@sitecore-marketplace-sdk/xmc': minor
---

Update the Search Config API (`xmc.search`) schema to the latest Origin API response.

Added to `Config`: `connections`, `deletedAt`, `deletedBy`, `hasDraft`, `locales`, `publishedAt`, `publishedBy`, `schedule`, `sourceType`, `status`, `suggestion`, and `versionNumber`. `searchSettings` gains `semanticRanking`. New sub-schemas introduced: `Connection`, `Schedule`, `SitemapSettings`, `SitecrawlSettings`, `SuggestionSettings`, `SuggestionModeSettings`, `SemanticRankingSearchSetting`, `CrawlRule`, `FieldExtraction`, `ExtractionPattern`, `Site`, and `ExtractionSource`.

Breaking:

- Removed `Config.contentType`, `Config.contentTypes`, and `Config.templateIds` (replaced by `sourceType` / `templateId`).
- `Config` now requires `createdAt`, `description`, `fields`, `id`, `name`, `searchClientKey`, `tenantId`, and `updatedAt` (previously optional).
- `Field` now requires `displayName`, `facet`, `filter`, `key`, `name`, `retrieve`, `search`, `sort`, and `type` (previously optional).
- `SearchFeature.enabled` is now required.
- `ErrorResponse.internal` and `ErrorResponse.message` changed from `{ [key: string]: unknown }` to `unknown`.
