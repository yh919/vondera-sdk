import { describe, it, expect } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiClient } from "../src/client";

const mock = new MockAdapter(axios);

describe("Error handling", () => {
  it("normalizes axios errors with response", async () => {
    mock
      .onGet("https://api.test/products")
      .reply(500, { message: "server error", code: "ERR" });
    const client = new ApiClient({ apiKey: "k", baseURL: "https://api.test" });

    try {
      await client.products.list();
      throw new Error("Expected to throw");
    } catch (err: any) {
      expect(err.isAxios).toBeTruthy();
      expect(err.status).toBe(500);
      expect(err.data).toBeDefined();
      expect(err.message).toContain("server error");
    }
  });

  it("handles network/no-response errors gracefully", async () => {
    // Simulate network error by not providing a reply and forcing networkError
    mock.onGet("https://api.test/products").networkError();
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "k",
      baseURL: process.env.VONDERA_API_BASE || "https://api.test",
    });

    try {
      await client.products.list();
      throw new Error("Expected to throw");
    } catch (err: any) {
      expect(err.isAxios).toBeTruthy();
      expect(err.status).toBeUndefined();
      //   expect(err.message).toContain("No response received");
    }
  });
});
