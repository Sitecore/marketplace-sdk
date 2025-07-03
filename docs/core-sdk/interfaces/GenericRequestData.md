[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / GenericRequestData

# Interface: GenericRequestData

Defined in: [packages/core/src/shared-types.ts:8](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L8)

## Properties

### body?

> `optional` **body**: `ArrayBuffer`

Defined in: [packages/core/src/shared-types.ts:38](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L38)

The request body, which must be provided as an ArrayBuffer.
This is typically used for sending binary data or serialized content.

***

### contextId?

> `optional` **contextId**: `string`

Defined in: [packages/core/src/shared-types.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L13)

An optional context ID associated with the request.
This can be used to identify or group related requests.

***

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Defined in: [packages/core/src/shared-types.ts:32](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L32)

Optional headers to include in the request.
These headers can be used to provide additional metadata or configuration
for the request, such as authentication tokens or content type.

***

### method?

> `optional` **method**: `string`

Defined in: [packages/core/src/shared-types.ts:25](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L25)

The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
Defaults to 'GET' if not specified.

***

### path

> **path**: `string`

Defined in: [packages/core/src/shared-types.ts:19](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L19)

The API endpoint path, which can be relative or absolute.
For example: '/api/resource' or 'https://example.com/api/resource'.

***

### requiresAuth

> **requiresAuth**: `boolean`

Defined in: [packages/core/src/shared-types.ts:44](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/core/src/shared-types.ts#L44)

Indicates whether authentication is required for the request.
If true, the request will include authentication headers or tokens.
