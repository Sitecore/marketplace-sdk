[**@sitecore-marketplace-sdk/core**](../README.md)

***

[@sitecore-marketplace-sdk/core](../README.md) / CoreError

# Class: CoreError

Defined in: [packages/core/src/errors.ts:59](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L59)

Core error class that implements the SDKError interface.
Provides static factory methods for creating common error types.

## Example

```typescript
// Creating a timeout error
throw CoreError.timeout();

// Creating a method not found error
throw CoreError.methodNotFound('getUserInfo');
```

## Extends

- `Error`

## Implements

- [`SDKError`](../interfaces/SDKError.md)

## Constructors

### Constructor

> **new CoreError**(`code`, `message`, `details?`): `CoreError`

Defined in: [packages/core/src/errors.ts:60](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L60)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `code` | [`ErrorCode`](../enumerations/ErrorCode.md) |
| `message` | `string` |
| `details?` | `unknown` |

#### Returns

`CoreError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Implementation of

[`SDKError`](../interfaces/SDKError.md).[`cause`](../interfaces/SDKError.md#cause)

#### Inherited from

`Error.cause`

***

### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Defined in: [packages/core/src/errors.ts:61](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L61)

#### Implementation of

[`SDKError`](../interfaces/SDKError.md).[`code`](../interfaces/SDKError.md#code)

***

### details?

> `optional` **details**: `unknown`

Defined in: [packages/core/src/errors.ts:63](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L63)

#### Implementation of

[`SDKError`](../interfaces/SDKError.md).[`details`](../interfaces/SDKError.md#details)

***

### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Implementation of

[`SDKError`](../interfaces/SDKError.md).[`message`](../interfaces/SDKError.md#message)

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Implementation of

[`SDKError`](../interfaces/SDKError.md).[`name`](../interfaces/SDKError.md#name)

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Implementation of

[`SDKError`](../interfaces/SDKError.md).[`stack`](../interfaces/SDKError.md#stack)

#### Inherited from

`Error.stack`

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@20.17.28/node\_modules/@types/node/globals.d.ts:98

Optional override for formatting stack traces

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@20.17.28/node\_modules/@types/node/globals.d.ts:100

#### Inherited from

`Error.stackTraceLimit`

## Methods

### alreadyInitialized()

> `static` **alreadyInitialized**(): `CoreError`

Defined in: [packages/core/src/errors.ts:103](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L103)

Creates an already initialized error.

#### Returns

`CoreError`

***

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/.pnpm/@types+node@20.17.28/node\_modules/@types/node/globals.d.ts:91

Create .stack property on a target object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

***

### executionError()

> `static` **executionError**(`error`): `CoreError`

Defined in: [packages/core/src/errors.ts:119](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L119)

Creates an execution error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | `unknown` | The underlying error that caused the execution failure |

#### Returns

`CoreError`

***

### handshakeFailed()

> `static` **handshakeFailed**(`details?`): `CoreError`

Defined in: [packages/core/src/errors.ts:81](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L81)

Creates a handshake failed error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `details?` | `unknown` | Optional details about the failure |

#### Returns

`CoreError`

***

### invalidOrigin()

> `static` **invalidOrigin**(`origin`): `CoreError`

Defined in: [packages/core/src/errors.ts:89](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L89)

Creates an invalid origin error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `origin` | `string` | The invalid origin that was detected |

#### Returns

`CoreError`

***

### methodNotFound()

> `static` **methodNotFound**(`method`): `CoreError`

Defined in: [packages/core/src/errors.ts:111](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L111)

Creates a method not found error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `method` | `string` | The name of the method that wasn't found |

#### Returns

`CoreError`

***

### notInitialized()

> `static` **notInitialized**(): `CoreError`

Defined in: [packages/core/src/errors.ts:96](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L96)

Creates a not initialized error.

#### Returns

`CoreError`

***

### timeout()

> `static` **timeout**(`details?`): `CoreError`

Defined in: [packages/core/src/errors.ts:73](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/core/src/errors.ts#L73)

Creates a timeout error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `details?` | `unknown` | Optional details about the timeout |

#### Returns

`CoreError`
