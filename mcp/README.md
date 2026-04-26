# Black Book MCP server

An MCP server that exposes the Black Book catalog of 86 business AI specialists, 9 prompt-engineering frameworks, and 13 pre-built multi-specialist workflows — for use in **Claude Desktop** and any other MCP-aware client.

The Claude Code plugin version (subagents + skills + slash commands) doesn't transplant to Desktop because Desktop has no plugin surface. MCP is the alternative — Desktop natively supports MCP servers.

## What you get

Eight tools and a catalog resource:

| Tool                  | What it does                                                        |
| --------------------- | ------------------------------------------------------------------- |
| `list_specialists`    | Browse the catalog. Filter by domain, framework, or kind.           |
| `get_specialist`      | Return a specialist's full system-prompt body. Adopt as a persona.  |
| `find_specialist`     | Recommend specialists for a task description.                       |
| `list_frameworks`     | Return all 9 frameworks with letter mappings and use cases.         |
| `apply_framework`     | Wrap a task in a framework's intake template.                       |
| `prompt_bank`         | Pick the best specialist + framework, return a tailored prompt.     |
| `list_flows`          | Return all 13 pre-built multi-specialist workflows.                 |
| `flow`                | Return the chain definition for a named workflow.                   |

Resource: `black-book://catalog` — the full catalog as JSON.

## Install for Claude Desktop

### 1. Clone the repo

```bash
git clone https://github.com/lswank/black-book ~/code/black-book
cd ~/code/black-book/mcp
npm install
```

### 2. Add to Claude Desktop config

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "black-book": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/code/black-book/mcp/server.mjs"]
    }
  }
}
```

Replace the path with where you cloned the repo. The file path needs to be absolute.

### 3. Restart Claude Desktop

Quit Claude Desktop completely (Cmd-Q on macOS) and relaunch. You should see "black-book" in the MCP tool list when you open the slash-command picker (`/`).

### 4. Try it

> "Use the `black-book` MCP server. Find me a specialist for writing a sales email sequence to re-engage churned customers, then load that specialist's full prompt."

Claude will call `find_specialist` → `get_specialist` and adopt the persona for the rest of the conversation.

## Install for Cursor, Codex, and other MCP clients

The server is a generic MCP server over stdio. Any client that accepts a stdio MCP server config can use it. Point the client at `node /path/to/black-book/mcp/server.mjs` with no arguments.

## Configuration

The server reads `catalog.json` and the specialist files from the parent of `server.mjs` by default. Override with the `BLACK_BOOK_ROOT` environment variable:

```json
{
  "mcpServers": {
    "black-book": {
      "command": "node",
      "args": ["/path/to/server.mjs"],
      "env": {
        "BLACK_BOOK_ROOT": "/path/to/black-book"
      }
    }
  }
}
```

## How specialists work over MCP

Two usage patterns:

**Persona-takeover** — for skills, advisors, coaches:

```
1. find_specialist("how should I structure our outbound team?")
   → recommends sales-leader-advisor
2. get_specialist("sales-leader-advisor")
   → returns the full skill body
3. Claude adopts the persona and the conversation proceeds.
```

**Prompt-emit** — for artifact-producing subagents when you want the prompt, not a takeover:

```
1. prompt_bank("write a press release for our $20M Series B")
   → recommends press-release-writer + F-I-T, emits filled template
2. You paste the template into Claude or send it through.
```

## Why is this in the same repo as the Claude Code plugin?

So the catalog stays single-source-of-truth. Every specialist is one markdown file; the Claude Code plugin reads it directly via subagent/skill registration; the MCP server reads it via `catalog.json` and serves the body over the protocol. Edits to specialists update both surfaces simultaneously — no fork, no drift.

## Development

```bash
npm install
npm start         # runs the server on stdio
```

For testing the protocol without Claude Desktop:

```bash
(echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"t","version":"1"}}}'; \
 echo '{"jsonrpc":"2.0","method":"notifications/initialized"}'; \
 echo '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'; \
 sleep 0.5) | npm start
```

## License

MIT — same as the parent repo.
