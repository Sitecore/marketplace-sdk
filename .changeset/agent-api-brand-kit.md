---
'@sitecore-marketplace-sdk/xmc': minor
---

Regenerate the Agent API (`xmc.agent`) client from the latest Agent API spec (`ai-agent-api-use.sitecorecloud.io`).

New endpoints: Brand kits, Brand contexts, Briefs, Experiments, Flow definitions, personalization v2, plus page component position/removal and content referrers.

Breaking changes: the v1 personalization operations were renamed — `personalizationCreatePersonalizationVersion` → `personalizationCreatePersonalizationVersionV1` and `personalizationGetPersonalizationVersionsByPage` → `personalizationGetPersonalizationVersionsByPageV1` — while the old names now target the new v2 endpoints. Several types were renamed (e.g. `CreatePersonalizationRequest` → `CreatePersonalizationRequestV1`, `PersonalizationVariantDetailModel` → `PersonalizationVariantDetailModelV1`).
