import { VONDERA_API_BASE, VONDERA_API_KEY } from "./config.js";

const statusEl = document.getElementById("status");
const outEl = document.getElementById("output");

function setStatus(s) {
  if (statusEl) statusEl.textContent = s;
}
function setOutput(o) {
  if (outEl) outEl.textContent = o;
}

if (!VONDERA_API_BASE || !VONDERA_API_KEY) {
  setStatus(
    "Missing configuration — copy config.example.js → config.js and set values."
  );
  setOutput("See README or examples/browser/config.example.js for details.");
} else {
  setStatus("Calling API...");

  (async () => {
    try {
      // If the bundled SDK is available as a global, use it (preferred).
      // The bundle exposes `window.VonderaSDK` and `VonderaSDK.ApiClient`.
      if (window.VonderaSDK && window.VonderaSDK.ApiClient) {
        const Client = window.VonderaSDK.ApiClient;
        const client = new Client({
          apiKey: VONDERA_API_KEY,
          baseURL: VONDERA_API_BASE,
        });
        const res = await client.products.list({ pageNo: 1, limit: 5 });
        setStatus("Response received via bundled SDK");
        setOutput(JSON.stringify(res, null, 2));
        return;
      }

      // Fallback: direct fetch when the bundle isn't present
      const url = `${VONDERA_API_BASE.replace(
        /\/$/,
        ""
      )}/products?pageNo=1&limit=5`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": VONDERA_API_KEY,
          Accept: "application/json",
        },
      });

      const json = await res.json();
      setStatus("Response received (see below)");
      setOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setStatus("Request failed");
      setOutput(String(err));
    }
  })();
}
