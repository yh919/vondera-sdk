# vondera-sdk

Lightweight, well-typed JavaScript / TypeScript client for the Vondera Public APIs.

This package is intended for application developers who want a simple, typed client
to call Vondera's public REST endpoints. It sends your store `x-api-key` header for
every request and exposes convenient endpoint helpers (products, categories,
wishlist, auth, ...).

--

## Installation

Install from npm:

```powershell
npm install vondera-sdk
# or
pnpm add vondera-sdk
```

## Quick start (TypeScript / ESM)

```ts
import { ApiClient } from "vondera-sdk";

const client = new ApiClient({
  apiKey: process.env.VONDERA_API_KEY || "your-api-key",
  timeout: 15000,
});

// List products
const res = await client.products.list({ pageNo: 1, limit: 10 });
console.log(res.data);

// Add item to wishlist
await client.wishlist.add("2032");
```

## Node (CommonJS) example

```js
const { ApiClient } = require("vondera-sdk");
const client = new ApiClient({ apiKey: process.env.VONDERA_API_KEY });
```

## Browser usage

Use the IIFE bundle for drop-in script usage (global `VonderaSDK`) or the
browser ESM module for modern setups. Bundles are built into `dist/browser/` and
there's a minimal example under `examples/browser/`.

Script tag (IIFE global):

```html
<script src="/path/to/vondera-sdk.iife.js"></script>
<script>
  const client = new VonderaSDK.ApiClient({ apiKey: "YOUR_KEY" });
  client.products.list({ pageNo: 1 }).then((r) => console.log(r.data));
</script>
```

## Usage notes

-- The SDK automatically sends `x-api-key` header. Provide a valid store API key.
-- Methods return a consistent response wrapper (use `.data` for payloads).
-- The `ApiClient` exposes an `http` property with the underlying Axios instance
for advanced customization (interceptors, timeouts, etc.).
-- The SDK controls the API `baseURL` globally. Do not pass `baseURL` to
`ApiClient`. The package uses a built-in default base URL or the
`VONDERA_API_BASE` environment variable when present.

## API surface (high level)

- `client.auth` — authentication helpers (login, signup)
- `client.products` — list, getById, featured, reviews, addReview
- `client.categories` — list, getById
- `client.wishlist` — add, get, remove

## Error handling

When requests fail, the SDK throws an `Error` that may include extra fields:

- `isAxios` — true for HTTP-related errors
- `status` — HTTP status code if available
- `data` — response body from the server when available

Example:

```ts
try {
  await client.wishlist.add("unknown");
} catch (err: any) {
  console.error(err.message, err.status, err.data);
}
```

## Types & IDE support

This package ships TypeScript declarations (`.d.ts`) so consumers get full
type-safety and editor completions. Inspect `src/types.ts` for the source types.

## Building & browser bundles

The library is built with `tsup` (ESM + CJS + types). Browser bundles (IIFE +
ESM) are produced with `esbuild` and placed in `dist/browser/`.

## Examples

There is a simple browser example in `examples/browser/`. To run it locally:

```powershell
copy .\\examples\\browser\\config.example.js .\\examples\\browser\\config.js
# edit .\\examples\\browser\\config.js and set VONDERA_API_KEY
npx http-server examples/browser -p 8080
# open http://127.0.0.1:8080
```

## Publishing & CI

The repository contains GitHub Actions workflows to run tests and publish on
Git tags. To enable automatic npm publishing add an `NPM_TOKEN` repository
secret with a token that has publish rights.

## Contributing

Contributions are welcome. For consumer-facing docs or usage questions, open an
issue. For code changes, add tests under `test/` and follow the repo's
contributing notes.

## License

MIT
