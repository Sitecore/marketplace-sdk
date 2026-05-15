---
'@sitecore-marketplace-sdk/ai': patch
'@sitecore-marketplace-sdk/xmc': patch
---

Remove constructor debug logging from the experimental AI and XMC clients so they do not emit unexpected console output during initialization.