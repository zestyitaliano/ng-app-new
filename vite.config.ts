import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { analyzeRedirectChain, lookupDnsRecords } from "./server/tool-api.mjs";

function json(res: any, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

const toolApiPlugin = () => ({
  name: "nogatekeeping-tool-api",
  configureServer(server: any) {
    server.middlewares.use("/api/dns-check", async (req: any, res: any, next: any) => {
      if (req.method !== "GET") {
        next();
        return;
      }

      try {
        const requestUrl = new URL(req.url || "/", "http://127.0.0.1");
        const result = await lookupDnsRecords({
          domain: requestUrl.searchParams.get("domain"),
          type: requestUrl.searchParams.get("type"),
          server: requestUrl.searchParams.get("server"),
        });
        json(res, 200, result);
      } catch (error) {
        json(res, 400, {
          error:
            error instanceof Error ? error.message : "DNS lookup failed.",
        });
      }
    });

    server.middlewares.use(
      "/api/redirect-analyzer",
      async (req: any, res: any, next: any) => {
        if (req.method !== "GET") {
          next();
          return;
        }

        try {
          const requestUrl = new URL(req.url || "/", "http://127.0.0.1");
          const result = await analyzeRedirectChain(
            requestUrl.searchParams.get("url"),
          );
          json(res, 200, result);
        } catch (error) {
          json(res, 400, {
            error:
              error instanceof Error
                ? error.message
                : "Redirect analysis failed.",
          });
        }
      },
    );
  },
});

// If you deploy under a subpath (like /design-tools/), set base: "/design-tools/"
// Otherwise leave it as "/" (default).
export default defineConfig({
  plugins: [react(), toolApiPlugin()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api/convert/heic": {
        target: "http://127.0.0.1:8788",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
  },
});
