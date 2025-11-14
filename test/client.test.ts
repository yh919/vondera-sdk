import { describe, it, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiClient } from "../src/client";

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

describe("ApiClient basic behavior", () => {
  it("attaches x-api-key header on requests", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "abc",
      baseURL: process.env.VONDERA_API_BASE || "https://api.test",
    });

    mock
      .onGet(`${process.env.VONDERA_API_BASE || "https://api.test"}/products`)
      .reply((config) => {
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
      baseURL: process.env.VONDERA_API_BASE || "https://api.test",
      timeout: 1,
    });
    // axios-mock-adapter does not simulate timeouts; we assert client.http.defaults.timeout
    expect((client as any).http.defaults.timeout).toBe(1);
  });
});
