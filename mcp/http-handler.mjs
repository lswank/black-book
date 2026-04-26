// Black Book MCP server — Streamable HTTP transport.
// For hosted deployments (Vercel Functions, any Node HTTP environment).
//
// Exports:
//   createBlackBookHttpHandler({ root?, version? }) — returns a Node-style
//     (req, res) => Promise<void> handler suitable for use with the standard
//     Node http module, Vercel Functions, or any framework that accepts a
//     Node IncomingMessage / ServerResponse pair.
//
// Stateless, per-request transport — each call constructs a fresh transport
// and server pair, processes the request, and closes. This is the canonical
// pattern for serverless deployments where instance reuse is not guaranteed
// across requests.

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createBlackBookMcpServer } from "./factory.mjs";

export function createBlackBookHttpHandler(options = {}) {
  return async function handler(req, res) {
    if (req.method === "GET" || req.method === "DELETE") {
      // Stateless servers don't support GET (server-initiated SSE) or DELETE.
      res.writeHead(405, { "Content-Type": "application/json", "Allow": "POST" });
      res.end(
        JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Method Not Allowed (server is stateless; use POST for tool calls)" },
          id: null,
        }),
      );
      return;
    }

    if (req.method !== "POST") {
      res.writeHead(405, { "Content-Type": "application/json", "Allow": "POST" });
      res.end(
        JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Method Not Allowed" },
          id: null,
        }),
      );
      return;
    }

    let body;
    try {
      body = await readJsonBody(req);
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32700, message: "Parse error: " + (err?.message ?? "invalid JSON") },
          id: null,
        }),
      );
      return;
    }

    let server;
    try {
      server = createBlackBookMcpServer(options);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Server initialization failed: " + (err?.message ?? "unknown") },
          id: null,
        }),
      );
      return;
    }

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    const cleanup = () => {
      try { transport.close(); } catch {}
      try { server.close(); } catch {}
    };

    res.on("close", cleanup);

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
    } catch (err) {
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            jsonrpc: "2.0",
            error: { code: -32603, message: "Internal error: " + (err?.message ?? "unknown") },
            id: body && typeof body === "object" && "id" in body ? body.id : null,
          }),
        );
      }
      cleanup();
    }
  };
}

async function readJsonBody(req) {
  // If a framework already parsed the body (Vercel, Express, etc.), use that.
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve, reject) => {
    let chunks = "";
    req.on("data", (c) => { chunks += c; });
    req.on("end", () => {
      if (!chunks) return resolve({});
      try { resolve(JSON.parse(chunks)); }
      catch (err) { reject(err); }
    });
    req.on("error", reject);
  });
}
