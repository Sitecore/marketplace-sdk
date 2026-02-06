# x-sdk-method-name Override

The `x-sdk-method-name` OpenAPI extension allows you to override the generated SDK method name for any operation. This is useful when the auto-generated name from `operationId` is unwieldy or doesn't follow your preferred naming conventions.

## Usage

Add `x-sdk-method-name` to any operation in your OpenAPI specification:

```yaml
paths:
  /api/v1/sites/{siteId}/rename:
    post:
      operationId: renameSitev2xmappsRenameSiteOperation
      x-sdk-method-name: renameSite
      tags: [Sites]
      summary: Rename a site
      # ...rest of operation
```

The generated SDK will use `renameSite` instead of `renameSitev2xmappsRenameSiteOperation`.

## Validation Rules

The plugin validates the `x-sdk-method-name` value according to these rules:

1. **Valid identifier format**: Must match the regex `^[A-Za-z_][A-Za-z0-9_]*$`
   - Must start with a letter (A-Z, a-z) or underscore (_)
   - Can contain letters, digits (0-9), and underscores
   - Cannot contain hyphens, spaces, or special characters

2. **Non-empty string**: Must be a non-empty string (whitespace-only is rejected)

3. **Unique within tag/client**: Each `x-sdk-method-name` must be unique within the same tag (client bucket). The same name can be used in different tags.

## Examples

### Valid names

```yaml
x-sdk-method-name: renameSite          # camelCase
x-sdk-method-name: rename_site         # snake_case
x-sdk-method-name: RenameSite          # PascalCase
x-sdk-method-name: _privateSite        # starts with underscore
x-sdk-method-name: site2               # contains digits
```

### Invalid names

```yaml
x-sdk-method-name: rename-site         # hyphens not allowed
x-sdk-method-name: 2rename             # cannot start with digit
x-sdk-method-name: rename site         # spaces not allowed
x-sdk-method-name: ""                  # empty string
```

## Error Handling

The plugin will fail SDK generation with a clear error message if:

- The `x-sdk-method-name` is not a valid identifier
- The same `x-sdk-method-name` is used twice within the same tag

Example error messages:

```
Invalid x-sdk-method-name "rename-site" for operationId "RenameSiteV2".
Must match /^[A-Za-z_][A-Za-z0-9_]*$/.

Duplicate x-sdk-method-name "renameSite" in tag/client "Sites".
First seen in operationId "RenameSiteV1", again in "RenameSiteV2".
```

## Fallback Behavior

If `x-sdk-method-name` is not specified, the plugin does nothing and the default naming based on `operationId` is used.

## Integration

The plugin is automatically applied during SDK generation. No additional configuration is needed beyond adding the `x-sdk-method-name` extension to your OpenAPI specification.
