// --- API Key State ---
let VONDERA_API_KEY = localStorage.getItem("vondera_api_key") || "";

function setApiKey(key) {
  VONDERA_API_KEY = key;
  localStorage.setItem("vondera_api_key", key);
}

window.addEventListener("DOMContentLoaded", () => {
  // Set API key input value from storage
  const apiKeyInput = document.getElementById("api-key-input");
  if (apiKeyInput) {
    apiKeyInput.value = VONDERA_API_KEY;
  }
  const apiKeyForm = document.getElementById("api-key-form");
  if (apiKeyForm) {
    apiKeyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setApiKey(apiKeyInput.value.trim());
      apiKeyInput.blur();
      // Optionally, show a toast or feedback
    });
  }
  renderDocs();
});

const ENDPOINTS = [
  {
    group: "Products",
    endpoints: [
      {
        method: "GET",
        path: "/products",
        name: "List Products",
        desc: "Get a paginated list of products.",
        params: [
          { name: "pageNo", type: "number", required: false, example: 1 },
          { name: "limit", type: "number", required: false, example: 5 },
        ],
        requestType: null,
        responseType: "ProductListResponse",
        tryIt: true,
        sdkCall: async (client, params) => client.products.list(params),
        exampleParams: { pageNo: 1, limit: 5 },
      },
      {
        method: "GET",
        path: "/products/single/{id}",
        name: "Get Product by ID",
        desc: "Get details for a single product by ID.",
        params: [
          { name: "id", type: "string", required: true, example: "product_id" },
        ],
        requestType: null,
        responseType: "ProductDetailResponse",
        tryIt: true,
        sdkCall: async (client, { id }) => client.products.getById(id),
        exampleParams: { id: "product_id" },
      },
      {
        method: "GET",
        path: "/products/featured",
        name: "Featured Products",
        desc: "Get featured products.",
        params: [],
        requestType: null,
        responseType: "any",
        tryIt: true,
        sdkCall: async (client) => client.products.featured(),
        exampleParams: {},
      },
      {
        method: "GET",
        path: "/products/{productId}/review",
        name: "List Product Reviews",
        desc: "Get reviews for a product.",
        params: [
          {
            name: "productId",
            type: "string",
            required: true,
            example: "product_id",
          },
          { name: "page", type: "number", required: false, example: 1 },
          { name: "limit", type: "number", required: false, example: 5 },
        ],
        requestType: null,
        responseType: "any",
        tryIt: true,
        sdkCall: async (client, { productId, page, limit }) =>
          client.products.reviews(productId, page, limit),
        exampleParams: { productId: "product_id", page: 1, limit: 5 },
      },
      {
        method: "POST",
        path: "/products/{productId}/review",
        name: "Add Product Review",
        desc: "Add a review for a product.",
        params: [
          {
            name: "productId",
            type: "string",
            required: true,
            example: "product_id",
          },
        ],
        requestType:
          "{ rating: number; review: string; email: string; name: string }",
        responseType: "any",
        tryIt: true,
        sdkCall: async (client, { productId, ...payload }) =>
          client.products.addReview(productId, payload),
        exampleParams: {
          productId: "product_id",
          rating: 5,
          review: "Great product!",
          email: "user@example.com",
          name: "John Doe",
        },
      },
    ],
  },
  {
    group: "Wishlist",
    endpoints: [
      {
        method: "POST",
        path: "/customer/wishlist",
        name: "Add to Wishlist",
        desc: "Add a product to the wishlist.",
        params: [
          {
            name: "productId",
            type: "string",
            required: true,
            example: "product_id",
          },
        ],
        requestType: null,
        responseType: "ApiResponse<null>",
        tryIt: true,
        sdkCall: async (client, { productId }) =>
          client.wishlist.add(productId),
        exampleParams: { productId: "product_id" },
      },
      {
        method: "GET",
        path: "/customer/wishlist",
        name: "Get Wishlist",
        desc: "Get the current user's wishlist.",
        params: [
          { name: "page", type: "number", required: false, example: 1 },
          { name: "limit", type: "number", required: false, example: 10 },
        ],
        requestType: null,
        responseType: "WishlistResponse",
        tryIt: true,
        sdkCall: async (client, { page, limit }) =>
          client.wishlist.get(page, limit),
        exampleParams: { page: 1, limit: 10 },
      },
      {
        method: "DELETE",
        path: "/customer/wishlist",
        name: "Remove from Wishlist",
        desc: "Remove a product from the wishlist.",
        params: [
          {
            name: "productId",
            type: "string",
            required: true,
            example: "product_id",
          },
        ],
        requestType: null,
        responseType: "ApiResponse<null>",
        tryIt: true,
        sdkCall: async (client, { productId }) =>
          client.wishlist.remove(productId),
        exampleParams: { productId: "product_id" },
      },
    ],
  },
  {
    group: "Categories",
    endpoints: [
      {
        method: "GET",
        path: "/category",
        name: "List Categories",
        desc: "Get all categories.",
        params: [],
        requestType: null,
        responseType: "Category[]",
        tryIt: true,
        sdkCall: async (client) => client.categories.list(),
        exampleParams: {},
      },
      {
        method: "GET",
        path: "/category/single/{id}",
        name: "Get Category by ID",
        desc: "Get a single category by ID.",
        params: [
          {
            name: "id",
            type: "string",
            required: true,
            example: "category_id",
          },
        ],
        requestType: null,
        responseType: "Category",
        tryIt: true,
        sdkCall: async (client, { id }) => client.categories.getById(id),
        exampleParams: { id: "category_id" },
      },
    ],
  },
  {
    group: "Auth",
    endpoints: [
      {
        method: "POST",
        path: "/customer/login",
        name: "Login",
        desc: "Authenticate a customer and get a token.",
        params: [],
        requestType: "LoginRequest",
        responseType: "AuthResponseData",
        tryIt: true,
        sdkCall: async (client, payload) => client.auth.login(payload),
        exampleParams: { email: "user@example.com", password: "password123" },
      },
      {
        method: "POST",
        path: "/customer/signup",
        name: "Signup",
        desc: "Register a new customer.",
        params: [],
        requestType: "Record<string, any>",
        responseType: "AuthResponseData",
        tryIt: true,
        sdkCall: async (client, payload) => client.auth.signup(payload),
        exampleParams: {
          email: "user@example.com",
          password: "password123",
          name: "John Doe",
        },
      },
    ],
  },
  {
    group: "Store",
    endpoints: [
      {
        method: "GET",
        path: "/store/",
        name: "Get Store",
        desc: "Get public store data.",
        params: [],
        requestType: null,
        responseType: "StoreData",
        tryIt: true,
        sdkCall: async (client) => client.store.get(),
        exampleParams: {},
      },
    ],
  },
];

function getTypeDef(typeName) {
  if (window.VONDERA_TYPES && window.VONDERA_TYPES[typeName]) {
    return window.VONDERA_TYPES[typeName];
  }
  return typeName;
}

function createInputField(param, value) {
  const input = document.createElement("input");
  input.name = param.name;
  input.type = param.type === "number" ? "number" : "text";
  input.required = !!param.required;
  input.value = value !== undefined ? value : "";
  input.placeholder = param.name + (param.required ? " *" : "");
  return input;
}

function createTextareaField(name, value) {
  const textarea = document.createElement("textarea");
  textarea.name = name;
  textarea.rows = 4;
  textarea.value = value !== undefined ? value : "";
  textarea.placeholder = name;
  return textarea;
}

function renderEndpoint(endpoint, client) {
  const div = document.createElement("div");
  div.className = "endpoint";

  // Title and method/path
  const h2 = document.createElement("h2");
  h2.innerHTML = `<span class="method">${endpoint.method}</span> <span class="path">${endpoint.path}</span>`;
  div.appendChild(h2);

  // Description
  const desc = document.createElement("div");
  desc.className = "desc";
  desc.textContent = endpoint.desc;
  div.appendChild(desc);

  // Types
  if (endpoint.requestType) {
    const types = document.createElement("div");
    types.className = "types";
    types.innerHTML = `<b>Request Type:</b> <pre>${getTypeDef(
      endpoint.requestType
    )}</pre>`;
    div.appendChild(types);
  }
  if (endpoint.responseType) {
    const types = document.createElement("div");
    types.className = "types";
    types.innerHTML = `<b>Response Type:</b> <pre>${getTypeDef(
      endpoint.responseType
    )}</pre>`;
    div.appendChild(types);
  }

  // Example
  if (endpoint.exampleParams) {
    const example = document.createElement("div");
    example.className = "example";
    example.innerHTML = `<b>Example:</b> <pre>${JSON.stringify(
      endpoint.exampleParams,
      null,
      2
    )}</pre>`;
    div.appendChild(example);
  }

  // Try it out
  if (endpoint.tryIt) {
    const tryDiv = document.createElement("div");
    tryDiv.className = "try";

    // API key input is now global (in header)

    // Params
    const form = document.createElement("form");
    form.style.marginBottom = "0.5em";
    form.onsubmit = (e) => e.preventDefault();

    const paramValues = { ...endpoint.exampleParams };
    (endpoint.params || []).forEach((param) => {
      const row = document.createElement("div");
      row.className = "param-row";
      const label = document.createElement("label");
      label.textContent = param.name + (param.required ? " *" : "");
      label.htmlFor = `${endpoint.name}-${param.name}`;
      let input = createInputField(param, paramValues[param.name]);
      input.id = `${endpoint.name}-${param.name}`;
      row.appendChild(label);
      row.appendChild(input);
      form.appendChild(row);
    });

    // For POST/PUT with body
    if (endpoint.requestType && endpoint.method === "POST") {
      const row = document.createElement("div");
      row.className = "param-row";
      const label = document.createElement("label");
      label.textContent = "Body (JSON)";
      label.htmlFor = `${endpoint.name}-body`;
      const textarea = createTextareaField(
        "body",
        JSON.stringify(endpoint.exampleParams, null, 2)
      );
      textarea.id = `${endpoint.name}-body`;
      row.appendChild(label);
      row.appendChild(textarea);
      form.appendChild(row);
    }

    // Submit button
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = `Try it`;
    form.appendChild(btn);

    // Response output
    const respLabel = document.createElement("div");
    respLabel.className = "response-label";
    respLabel.textContent = "Response:";
    const respDiv = document.createElement("div");
    respDiv.className = "response";
    respDiv.textContent = "";

    btn.onclick = async () => {
      btn.disabled = true;
      respDiv.textContent = "Loading...";
      respDiv.classList.remove("error", "success");
      let apiKey = VONDERA_API_KEY;
      if (!apiKey) {
        respDiv.textContent = "API key required (set at top right).";
        respDiv.classList.add("error");
        btn.disabled = false;
        return;
      }
      // Build params
      let params = {};
      (endpoint.params || []).forEach((param) => {
        const val = form.querySelector(`[name='${param.name}']`).value;
        if (val !== "") {
          params[param.name] = param.type === "number" ? Number(val) : val;
        }
      });
      // For POST body
      if (endpoint.requestType && endpoint.method === "POST") {
        try {
          const bodyVal = form.querySelector(`[name='body']`).value;
          Object.assign(params, JSON.parse(bodyVal));
        } catch (e) {
          respDiv.textContent = "Invalid JSON in body.";
          respDiv.classList.add("error");
          btn.disabled = false;
          return;
        }
      }
      // Create client
      let client;
      try {
        client = new window.VonderaSDK.ApiClient({ apiKey });
      } catch (e) {
        respDiv.textContent = "Failed to initialize SDK: " + e;
        respDiv.classList.add("error");
        btn.disabled = false;
        return;
      }
      try {
        const result = await endpoint.sdkCall(client, params);
        respDiv.textContent = JSON.stringify(result, null, 2);
        respDiv.classList.add("success");
      } catch (e) {
        respDiv.textContent = e?.message || String(e);
        respDiv.classList.add("error");
      }
      btn.disabled = false;
    };

    tryDiv.appendChild(form);
    tryDiv.appendChild(respLabel);
    tryDiv.appendChild(respDiv);
    div.appendChild(tryDiv);
  }

  return div;
}

function renderDocs() {
  const docs = document.getElementById("api-docs");
  docs.innerHTML = "";
  ENDPOINTS.forEach((group) => {
    const groupTitle = document.createElement("h2");
    groupTitle.textContent = group.group;
    docs.appendChild(groupTitle);
    group.endpoints.forEach((ep) => {
      docs.appendChild(renderEndpoint(ep));
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderDocs();
});
