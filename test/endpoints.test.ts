import { describe, it, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiClient } from "../src/client";

// Tests create a MockAdapter attached to the ApiClient's internal axios instance
// so that requests made via the SDK (which uses axios.create) are intercepted.

const API_BASE =
  "https://us-central1-brands-61c3d.cloudfunctions.net/app-api/api/public";

describe("Endpoints - integration (mocked)", () => {
  it("wishlist add/get/remove flows", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "key-123",
    });
    const mock = new MockAdapter((client as any).http);

    // Add
    mock.onPost(`/customer/wishlist`).reply((config) => {
      expect(config.headers!["x-api-key"]).toBe(
        process.env.VONDERA_API_KEY || "key-123"
      );
      const body = JSON.parse(config.data || "{}");
      expect(body.productId).toBe("2032");
      return [
        200,
        { status: 200, message: "Product added to wishlist", data: null },
      ];
    });

    const addRes = await client.wishlist.add("2032");
    expect(addRes.status).toBe(200);

    // Get
    mock.onGet(`/customer/wishlist`).reply((config) => {
      expect(config.headers!["x-api-key"]).toBe(
        process.env.VONDERA_API_KEY || "key-123"
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

    const getRes = await client.wishlist.get(1, 10);
    expect(getRes.status).toBe(200);
    expect(getRes.data?.items).toBeDefined();

    // Remove
    mock.onDelete(`/customer/wishlist`).reply((config) => {
      expect(config.headers!["x-api-key"]).toBe(
        process.env.VONDERA_API_KEY || "key-123"
      );
      const body = JSON.parse(config.data || "{}");
      expect(body.productId).toBe("2032");
      return [
        200,
        { status: 200, message: "Product removed to wishlist", data: null },
      ];
    });

    const delRes = await client.wishlist.remove("2032");
    expect(delRes.status).toBe(200);
  });

  it("products list and detail", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "k",
    });
    const mock = new MockAdapter((client as any).http);

    mock.onGet(`/products`).reply(200, {
      status: 200,
      message: "Success",
      data: {
        items: [],
        isLastPage: true,
        nextPageNumber: null,
        currentPage: 1,
        totalPages: 1,
      },
    });

    const list = await client.products.list({ pageNo: 1, limit: 5 });
    expect(list.status).toBe(200);

    mock.onGet(`/products/single/0300`).reply(200, {
      status: 200,
      message: "Success",
      data: { product: { id: "0300", price: 100 } },
    });

    const detail = await client.products.getById("0300");
    expect(detail.status).toBe(200);
    expect(detail.data?.product.id).toBe("0300");
  });

  it("categories list and single", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "k",
    });
    const mock = new MockAdapter((client as any).http);
    mock
      .onGet(`/category`)
      .reply(200, { status: 200, message: "Success", data: [] });
    const cats = await client.categories.list();
    expect(cats.status).toBe(200);

    mock
      .onGet(`/category/single/abc`)
      .reply(200, { status: 200, message: "Success", data: { id: "abc" } });
    const single = await client.categories.getById("abc");
    expect(single.status).toBe(200);
    expect(single.data?.id).toBe("abc");
  });

  it("auth login/signup", async () => {
    const client = new ApiClient({
      apiKey: process.env.VONDERA_API_KEY || "k",
    });
    const mock = new MockAdapter((client as any).http);
    mock.onPost(`/customer/login`).reply((config) => {
      const body = JSON.parse(config.data || "{}");
      expect(body.email).toBe("a@b.c");
      return [
        200,
        {
          status: 200,
          message: "Login successful",
          data: { user: { id: "u1" }, token: "tok" },
        },
      ];
    });

    const login = await client.auth.login({ email: "a@b.c", password: "pass" });
    expect(login.status).toBe(200);
    expect(login.data?.token).toBeDefined();
  });
});
