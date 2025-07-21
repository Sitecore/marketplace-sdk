# Sitecore Marketplace SDK

The open-source Sitecore Marketplace SDK lets JavaScript/TypeScript developers build apps that extend and customize Sitecore products. 

This mono-repository manages the following Marketplace SDK packages:
- `core` – an internal package that sets up secure communication between a Marketplace application (the client) and Sitecore (the host), using the web browser's [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). For more information, refer to the package [README](packages/core/README.md).
- `client` – required for all Marketplace applications. This package provides secure, bidirectional communication between the Marketplace app and Sitecore. It lets you make queries and mutations. Queries support one-off data requests and subscriptions for live updates. Mutations trigger state changes or HTTP requests in Sitecore. For more information, refer to the package [README](packages/client/README.md).
- `xmc` – extends the Client SDK and provides type-safe interfaces for interacting with Sitecore XM Cloud APIs. For more information, refer to the package [README](packages/xmc/README.md).

The packages expose uniform, type-safe, and developer-friendly APIs to speed up your Marketplace app development work.

## Getting started

### Use the SDK in your app
To use the Marketplace SDK in your app, start by installing the `client` package, which is required for all Marketplace apps:
```bash
npm install @sitecore-marketplace-sdk/client
```
If your app needs to interact with XM Cloud APIs, you also need to install the `xmc` package:
```bash
npm install @sitecore-marketplace-sdk/xmc
```

  > [!NOTE]
  > For Intellisense to work correctly with the SDK packages, make sure all peer dependencies are installed and their versions are compatible. Issues with peer dependencies are logged in your terminal.

Then, refer to the READMEs of the installed packages, the reference documentation in the `/docs` folder, and the official [Marketplace developer documentation](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html) and [Marketplace SDK documentation](https://doc.sitecore.com/mp/en/developers/sdk/latest/sitecore-marketplace-sdk/sitecore-marketplace-sdk-for-javascript.html).

### Contribute to the SDK 
This section describes how to work with the monorepo so you can contribute to the SDK development.

#### Monorepo structure

The repository is structured as follows:

```
/root
├── package.json  // Root configuration, workspaces, and monorepo scripts
├── lerna.json    // Lerna configuration for multi-package management
├── packages
│     ├── core    // Core SDK (communication layer)
│     ├── client  // Client SDK (client application integration)
│     └── xmc     // XMC module (integration with Sitecore XM Cloud APIs)
└── docs          // Reference documentation and project guides
```

#### Prerequisites

- Node.js 16 or later. Check your installed version by using the `node --version` command.
- pnpm 10 or later. Check your installed version by using the `pnpm --version` command.

#### Installation

Install dependencies from the root:

```bash
pnpm install
```

This installs all dependencies across the packages and sets up the workspaces.

#### Monorepo commands

Here are the main monorepo commands defined in the root `package.json`:

- **Build all packages**  
  Build every package (for example, transpiling TypeScript):

  ```bash
  pnpm build
  ```

- **Clean all packages**  
  Remove build artifacts (such as the `dist` directories):

  ```bash
  pnpm clean
  ```

- **Lint all packages**  
  Run ESLint checks across all packages:

  ```bash
  pnpm lint
  ```

- **Run all tests**  
  Execute test suites for each package:

  ```bash
  pnpm test:all
  ```

- **Generate Client SDK types - Under development**  
  Automatically generate static TypeScript types for the Client SDK based on the defined schema:

  ```bash
  pnpm generate:client
  ```

#### Working with individual packages

Each package is inside the `packages/` directory. For example, to work with the Core SDK:

1. Navigate into the package folder:
   ```bash
   cd packages/core
   ```
2. Use package-specific scripts (e.g., `build`, `lint`, `test`) as defined in its own `package.json`.
  
## License 
The Sitecore Marketplace SDK is licensed under the Apache 2.0 License. Refer to the [LICENSE](./LICENSE.md) file in the repository root.

## Status
The Sitecore Marketplace SDK is actively maintained.
