---
'@sitecore-marketplace-sdk/client': patch
---

Update README documentation to use new `resourceAccess` property name

**What changed:**

- Updated README.md examples to use `resourceAccess` instead of the deprecated `resources` property
- Updated descriptive text to refer to "resource access" instead of "resources" for consistency with new property naming
- Improved code examples and documentation to reflect the current recommended API usage
- Enhanced initialization examples with comprehensive React hooks and error handling patterns

**Migration guide:**

When following the README examples, use:

- `applicationContext.resourceAccess` instead of `applicationContext.resources` in your code
- The examples now demonstrate best practices for SDK initialization and usage

This change ensures developers following the documentation will use the recommended property names from the start.
