#!/usr/bin/env node
// Black Book MCP server — stdio transport.
// For self-hosters and direct desktop installs (Claude Desktop, Cursor, Codex).
//
// For HTTP / hosted deployments, see http-handler.mjs.
//
// Reads catalog.json + specialist files from the parent of this script, or
// from BLACK_BOOK_ROOT if set.

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { resolve } from "node:path";
import { createBlackBookMcpServer } from "./factory.mjs";

const root = process.env.BLACK_BOOK_ROOT ? resolve(process.env.BLACK_BOOK_ROOT) : undefined;

let server;
try {
  server = createBlackBookMcpServer(root ? { root } : {});
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const transport = new StdioServerTransport();
await server.connect(transport);
