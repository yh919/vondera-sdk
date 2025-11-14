import { describe, it, expect } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiClient } from "../src/client";

const mock = new MockAdapter(axios);

const API_BASE =
  "https://us-central1-brands-61c3d.cloudfunctions.net/app-api/api/public";

describe("Error handling", () => {
  it("normalizes axios errors with response", async () => {
    const base = process.env.VONDERA_API_BASE || API_BASE;
    mock
      .onGet(`${base}/products`)
      .reply(500, { message: "server error", code: "ERR" });
    const client = new ApiClient({ apiKey: "k" });

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
    const base2 = process.env.VONDERA_API_BASE || API_BASE;
    mock.onGet(`${base2}/products`).networkError();
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "k",
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
