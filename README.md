# @vondera/sdk

Official Vondera Public API SDK for JavaScript and TypeScript.

This SDK provides a small, well-typed wrapper around Vondera's public REST APIs. It
handles authentication (sending the required `x-api-key` header), request/response
interceptors, unified error shapes, and convenient endpoint helpers.

**Contents**

- Installation
- Quick start
- Client API surface
- Configuration and environment variables
- Running tests (unit + optional integration)
- CI / Publishing
- Contributing

---

## Installation

Install via npm or pnpm:

```powershell
npm install
```

When consuming the published package:

```powershell
npm install @vondera/sdk
# or
pnpm add @vondera/sdk
```

## Quick start

Use the SDK in TypeScript or JavaScript. The client requires an API key and accepts an optional base URL and timeout.

```ts
import { ApiClient } from "@vondera/sdk";

const client = new ApiClient({
  apiKey: process.env.VONDERA_API_KEY!,
  baseURL:
    process.env.VONDERA_API_BASE || "https://app-expressapp-.../api/public",
  timeout: 15000,
});

// list products
const productsRes = await client.products.list({ pageNo: 1, limit: 10 });
console.log(productsRes.data);

// add to wishlist
await client.wishlist.add("2032");
```

## Usage in modern frontend frameworks

- ESM (recommended for React/Vue/Svelte with modern bundlers):

```js
import { ApiClient } from "@vondera/sdk";

const client = new ApiClient({ apiKey: "YOUR_KEY" });
```

- Direct browser usage (script tag): include the IIFE bundle and access the global `VonderaSDK`:

```html
<script src="/path/to/vondera-sdk.iife.js"></script>
<script>
  const client = new VonderaSDK.ApiClient({ apiKey: "YOUR_KEY" });
  client.products.list({ pageNo: 1 }).then(console.log);
</script>
```

- Native ESM in the browser (for modern browsers / CDNs):

```html
<script type="module">
  import { ApiClient } from "/node_modules/@vondera/sdk/dist/browser/vondera-sdk.mjs";
  const client = new ApiClient({ apiKey: "YOUR_KEY" });
  console.log(await client.products.list({ pageNo: 1 }));
</script>
```

These builds are produced by `npm run build` (library) and `npm run build:browser` (browser bundles). The package `exports` field allows bundlers to pick the ESM build for tree-shaking, and the `browser`/UMD bundles are available for direct script usage.

### Notes

- The SDK automatically sends `x-api-key` on every request. You must supply a valid store API key.
- All methods return the raw API response wrapper `ApiResponse<T>` where `data` contains the payload.

---

## Client API surface

Top-level properties on `ApiClient`:

- `auth` — authentication endpoints: `login(payload)`, `signup(payload)`
- `products` — `list(params)`, `getById(id)`, `featured()`, `reviews(productId, page, limit)`, `addReview(productId, payload)`
- `categories` — `list()`, `getById(id)`
- `wishlist` — `add(productId)`, `get(page, limit)`, `remove(productId)`
- `http` — the underlying Axios instance (exposed for advanced use)

See `src/endpoints/*` for more endpoint-specific helpers and their TypeScript signatures.

---

## Configuration & environment variables

You can provide config programmatically when creating `ApiClient`, or via environment variables.

- `apiKey` (required) — store API key, always sent as `x-api-key` header.
- `baseURL` — optional base URL for the API. If not provided the SDK uses `process.env.VONDERA_API_BASE` if available.
- `timeout` — optional request timeout in milliseconds (default: 15000).

Example `.env` (already present in this repo):

```dotenv
VONDERA_API_BASE=https://app-expressapp-jjbq3kbkma-uc.a.run.app/api/public
VONDERA_API_KEY=your_api_key_here
```

Load the env in your scripts (e.g. with `dotenv`) or set values in environment.

---

## Testing

Unit tests use `vitest` and `axios-mock-adapter`. The repository contains unit tests that run against mocked responses.

Run tests (single-run, suitable for CI):

```powershell
npx vitest run
# or
npm test -- --run
```

Run in watch mode (developer):

```powershell
npm test
```

Integration tests

- The repo can be extended with optional integration tests that call the live API using the values from `.env`.
- To avoid running live tests in CI by accident, integration tests should be gated behind an env var (for example `INTEGRATION=1 npx vitest run`).

Example integration test runner (recommended):

```powershell
# run only integration tests when explicitly requested
INTEGRATION=1 npx vitest run
```

---

## CI and publish

This repository includes two GitHub Actions workflows:

- `.github/workflows/ci.yml` — runs `npm ci`, `npm run build` and `npm test` on pushes and PRs to `main`/`master`.
- `.github/workflows/publish.yml` — publishes the package to npm when a Git tag matching `v*` is pushed. It expects an `NPM_TOKEN` secret.

CI tips

- Ensure the `test` script runs non-interactively in CI. The recommended command for CI is `vitest run`.

Publishing tips

- Create an npm token with publish rights and add it as repository secret `NPM_TOKEN`.
- Tag releases using `git tag vX.Y.Z` and push the tag: `git push origin vX.Y.Z` to trigger the publish workflow.

---

## Error handling

Network and API errors are normalized by the SDK. When a request fails you will get an `Error` object with optional properties:

- `isAxios` — true for HTTP-related errors
- `status` — HTTP status code (if available)
- `data` — the server response body (if available)

Example:

```ts
try {
  await client.wishlist.add("unknown");
} catch (err: any) {
  console.error("Request failed:", err.message, err.status);
}
```

---

## JSDoc and types

- All public classes and methods include JSDoc comments in `src/` to help editors surface documentation.
- The package emits TypeScript `.d.ts` files during build (`tsup` config) so consumers get full typing support.

---

## Contributing

Suggestions and PRs are welcome. Common contributions:

- Add missing endpoints in `src/endpoints` (keep methods small and focused).
- Extend `src/types.ts` with more precise types based on API responses.
- Add unit tests in `test/` and include integration tests gated by env var when necessary.

Before submitting a PR:

1. Run `npm ci`
2. Run `npm test -- --run`
3. Run `npm run build`

Thank you for helping improve the SDK.

# @vondera/sdk

Official Vondera Public API SDK for JavaScript and TypeScript.

## Installation

```bash
npm install @vondera/sdk
# or
pnpm add @vondera/sdk
```

## Quick start

```ts
import { ApiClient } from "@vondera/sdk";

const client = new ApiClient({
  apiKey: process.env.VONDERA_API_KEY || "your-api-key",
  baseURL:
    "https://us-central1-brands-61c3d.cloudfunctions.net/app-api/api/public",
  timeout: 15000,
});

// Get products
const res = await client.products.list({ pageNo: 1, limit: 10 });
console.log(res.data);

// Add to wishlist
await client.wishlist.add("2032");
```

## Client initialization

- `apiKey` (required): Your store API key. Sent as `x-api-key` header automatically.
- `baseURL` (optional): Base URL for the API. Defaults to env `VONDERA_API_BASE` or empty.
- `timeout` (optional): Request timeout in ms.

## Available endpoints

- `client.auth` - `login`, `signup`
- `client.products` - `list`, `getById`, `featured`, `reviews`, `addReview`
- `client.categories` - `list`, `getById`
- `client.wishlist` - `add`, `get`, `remove`

## Error handling

All network errors are thrown as `Error` objects with additional properties when available:

- `isAxios`: boolean flag indicating this was an Axios-related error
- `status`: HTTP status code (if available)
- `data`: response body (if available)

Example:

```ts
try {
  await client.wishlist.add("unknown");
} catch (err) {
  console.error(err.message, (err as any).status, (err as any).data);
}
```

## Building

This package uses `tsup` to build ESM and CJS outputs.

```bash
# or
npm install vondera-sdk
```

pnpm add vondera-sdk

## Testing

Tests are written using `vitest`.

```bash
npm test
```

import { ApiClient } from "vondera-sdk";

## Contributing

If you find missing endpoints or types, please open a PR with additions to `src/endpoints` and `src/types.ts`.

---

# or

npm install vondera-sdk

## Browser example (real request)

pnpm add vondera-sdk
There's a minimal browser example under `examples/browser/` that performs a real GET request to the public API using `fetch` and the required `x-api-key` header.

Steps to run the example locally:

1. Copy the example config and set your real values:
   import { ApiClient } from "vondera-sdk";

```powershell
copy .\examples\browser\config.example.js .\examples\browser\config.js
# Edit the resulting config.js and set VONDERA_API_KEY
```

2. Serve the `examples/browser` folder (static file server). You can use `npx http-server` or `npx serve`:

```powershell
npx http-server examples/browser -c-1 -p 8080
# then open http://127.0.0.1:8080 in your browser
```

Notes:

- The live API must accept requests from your browser origin (CORS). If you run into CORS issues, use a simple local proxy or run a small Node script to make the request server-side.
- This example intentionally uses `fetch` (not the SDK) to keep the browser demo minimal and dependency-free. It shows how to call the public endpoints directly with `x-api-key`.
