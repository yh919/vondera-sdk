import { describe, it, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiClient } from "../src/client";

let mock: MockAdapter | undefined;

// don't create a global axios mock here — each test will create a mock
// attached to the client's axios instance so the SDK's internal instance
// is intercepted reliably.

// Ensure tests use the SDK default base URL unless overridden by CI
const API_BASE =
  "https://us-central1-brands-61c3d.cloudfunctions.net/app-api/api/public";
process.env.VONDERA_API_BASE = process.env.VONDERA_API_BASE || API_BASE;

describe("ApiClient basic behavior", () => {
  it("attaches x-api-key header on requests", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "abc",
    });

    mock = new MockAdapter((client as any).http);

    mock.onGet(`/products`).reply((config) => {
      expect(config.headers!["x-api-key"]).toBe(
        process.env.VONDERA_API_KEY || "abc"
      );
      return [
        200,
        {
          status: 200,
          message: "ok",
          data: {
            items: [],
            isLastPage: true,
            nextPageNumber: null,
            currentPage: 1,
            totalPages: 1,
          },
        },
      ];
    });

    const res = await client.products.list();
    expect(res.status).toBe(200);
  });

  it("supports timeout configuration", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "abc",
      timeout: 1,
    });
    // axios-mock-adapter does not simulate timeouts; we assert client.http.defaults.timeout
    expect((client as any).http.defaults.timeout).toBe(1);
  });
});
