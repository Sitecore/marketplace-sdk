---
'@sitecore-marketplace-sdk/xmc': minor
---

Fix the Search Config API (`xmc.search`) schema to match the Origin API response. The previously onboarded schema was incomplete and inaccurate.

`Config` now includes `connections`, `deletedAt`, `deletedBy`, `hasDraft`, `locales`, `publishedAt`, `publishedBy`, `schedule`, `sourceType`, `status`, `suggestion`, and `versionNumber`; `searchSettings` includes `semanticRanking`; and the related sub-schemas (`Connection`, `Schedule`, `SitemapSettings`, `SitecrawlSettings`, `SuggestionSettings`, `SuggestionModeSettings`, `SemanticRankingSearchSetting`, `CrawlRule`, `FieldExtraction`, `ExtractionPattern`, `Site`, `ExtractionSource`) are now typed.

The stale `Config.contentType`, `Config.contentTypes`, and `Config.templateIds` fields are removed (replaced by `sourceType` / `templateId`). `Config` and `Field` now correctly mark their required properties, and `ErrorResponse.internal` / `ErrorResponse.message` are typed as `unknown`.