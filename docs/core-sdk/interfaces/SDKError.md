[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / SDKError

# Interface: SDKError

Defined in: [packages/core/src/errors.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/errors.ts#L41)

Interface for SDK errors that includes an error code and optional details.
All errors thrown by the SDK will implement this interface.

## Extends

- `Error`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Defined in: [packages/core/src/errors.ts:42](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/errors.ts#L42)

***

### details?

> `optional` **details**: `unknown`

Defined in: [packages/core/src/errors.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/core/src/errors.ts#L43)

***

### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`
