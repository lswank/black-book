// Factory for the Black Book MCP server.
// Exports `createBlackBookMcpServer({ root })` — registers all tools and
// resources against a fresh McpServer instance and returns it.
//
// Used by:
//   - server.mjs (stdio transport, for self-hosters and direct desktop installs)
//   - http-handler.mjs (streamable HTTP transport, for hosted deployments)

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(PACKAGE_DIR, "..");

// --- Framework metadata --------------------------------------------------

export const FRAMEWORKS = {
  "T-A-G": {
    letters: { T: "Task", A: "Action", G: "Goal" },
    best_for: "Quick ad-hoc requests where you know what you want done.",
  },
  "B-A-B": {
    letters: { B: "Before", A: "After", "B2": "Bridge" },
    best_for: "Cold outreach, problem/solution copy, turnaround narratives.",
  },
  "R-T-F": {
    letters: { R: "Role", T: "Task", F: "Format" },
    best_for: "Short, structured outputs — ad copy, headlines, social posts.",
  },
  "C-A-R-E": {
    letters: { C: "Context", A: "Action", R: "Result", E: "Example" },
    best_for: "Grounded work — landing pages, longer content with brand voice.",
  },
  "R-I-S-E": {
    letters: { R: "Role", I: "Input", S: "Steps", E: "Expectation" },
    best_for: "Multi-step long outputs — full posts, scripts, sequences.",
  },
  "A-I-M": {
    letters: { A: "Action", I: "Intent", M: "Metric" },
    best_for: "Strategy — channels, OKRs, growth loops, market entry.",
  },
  "G-R-O": {
    letters: { G: "Goal", R: "Reason", O: "Output" },
    best_for: "Lightweight planning — newsletters, calendars, briefs.",
  },
  "F-I-T": {
    letters: { F: "Format", I: "Input", T: "Task" },
    best_for: "Transforms — press releases, meta tags, summaries.",
  },
  "L-E-D": {
    letters: { L: "Level", E: "Expectation", D: "Direction" },
    best_for: "Calibration — when the same content could be written ten ways.",
  },
};

const FRAMEWORK_NAMES = Object.keys(FRAMEWORKS);

// --- /flow scenarios -----------------------------------------------------

export const FLOWS = {
  launch: {
    description: "A product launch — positioning to press.",
    chain: ["positioning-coach", "landing-page-copywriter", "seo-meta-writer", "social-post-writer", "ad-copywriter", "press-release-writer"],
  },
  hire: {
    description: "Hiring a new role end-to-end.",
    chain: ["talent-strategist", "job-description-writer", "interview-kit-builder", "offer-letter-writer", "onboarding-plan-writer"],
  },
  "board-update": {
    description: "A complete board update package.",
    chain: ["cfo-advisor", "board-financial-update-writer", "board-update-writer", "vision-memo-writer"],
  },
  "enterprise-deal": {
    description: "Working a complex enterprise deal.",
    chain: ["enterprise-sales-coach", "discovery-call-script-writer", "demo-deck-writer", "mutual-action-plan-writer", "proposal-writer"],
  },
  "postmortem-loop": {
    description: "Incident postmortem with downstream comms.",
    chain: ["crisis-comms-coach", "postmortem-writer", "exec-comms-writer", "decision-memo-writer"],
  },
  "okr-cycle": {
    description: "Quarterly planning.",
    chain: ["strategy-coach", "chief-of-staff-advisor", "okr-writer", "all-hands-talking-points-writer"],
  },
  fundraise: {
    description: "A fundraise narrative push.",
    chain: ["fundraise-narrative-coach", "vision-memo-writer", "demo-deck-writer", "investor-update-writer"],
  },
  "content-engine": {
    description: "A content production loop.",
    chain: ["content-strategist", "blog-post-writer", "seo-meta-writer", "social-post-writer", "newsletter-writer"],
  },
  "prd-loop": {
    description: "A product-spec loop.",
    chain: ["product-strategist", "prd-writer", "user-story-writer", "release-notes-writer"],
  },
  migration: {
    description: "A technical migration with comms.",
    chain: ["engineering-leader-advisor", "migration-plan-writer", "exec-comms-writer", "postmortem-writer"],
  },
  "qbr-prep": {
    description: "Preparing for a customer QBR.",
    chain: ["cs-leader-advisor", "customer-health-summary-writer", "qbr-deck-writer", "csm-coach"],
  },
  "churn-recovery": {
    description: "Saving an at-risk account.",
    chain: ["cs-leader-advisor", "customer-health-summary-writer", "churn-save-script-writer", "customer-apology-writer"],
  },
  expansion: {
    description: "Running an account expansion.",
    chain: ["cs-leader-advisor", "expansion-pitch-writer", "proposal-writer"],
  },
};

// --- Catalog loading -----------------------------------------------------

function loadCatalog(root) {
  const catalogPath = join(root, "catalog.json");
  if (!existsSync(catalogPath)) {
    throw new Error(
      `[black-book-mcp] Could not find catalog.json at ${catalogPath}. ` +
        `Pass a different root, or set BLACK_BOOK_ROOT.`,
    );
  }
  return JSON.parse(readFileSync(catalogPath, "utf8"));
}

function specialistByName(catalog, name) {
  return catalog.entries.find((e) => e.name === name) ?? null;
}

function loadSpecialistBody(root, entry) {
  if (!entry) return null;
  const text = readFileSync(join(root, entry.path), "utf8");
  if (text.startsWith("---\n")) {
    const end = text.indexOf("\n---\n", 4);
    if (end !== -1) return text.slice(end + 5).trim();
  }
  return text.trim();
}

// --- Server factory ------------------------------------------------------

export function createBlackBookMcpServer({ root = DEFAULT_ROOT, version = "0.4.0" } = {}) {
  const catalog = loadCatalog(root);

  const server = new McpServer(
    { name: "black-book", version },
    {
      instructions:
        "Black Book provides 86 business AI specialists across 9 domains, " +
        "9 prompt-engineering frameworks, and 13 pre-built multi-specialist " +
        "workflows. Use list_specialists or find_specialist to locate the right " +
        "specialist; get_specialist returns its full system prompt body, which you " +
        "can adopt as a persona for the rest of the conversation. Use " +
        "apply_framework or prompt_bank when the user wants a structured prompt " +
        "rather than a specialist takeover.",
    },
  );

  // --- Tools -------------------------------------------------------------

  server.registerTool(
    "list_specialists",
    {
      title: "List Black Book specialists",
      description:
        "List specialists from the Black Book catalog. Optionally filter by domain, framework, " +
        "or kind (subagent | skill). Returns name, kind, domain, framework, and a one-line description.",
      inputSchema: {
        domain: z.string().optional().describe("Filter to a single domain (e.g., 'marketing', 'sales', 'product-eng')."),
        framework: z.string().optional().describe("Filter to specialists whose default framework matches (e.g., 'R-I-S-E')."),
        kind: z.enum(["subagent", "skill"]).optional().describe("Filter by kind: subagents produce artifacts; skills coach conversations."),
      },
    },
    async ({ domain, framework, kind }) => {
      let entries = catalog.entries;
      if (domain) entries = entries.filter((e) => e.domain === domain);
      if (framework) entries = entries.filter((e) => e.framework === framework);
      if (kind) entries = entries.filter((e) => e.kind === kind);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                count: entries.length,
                entries: entries.map(({ name, kind, domain, framework, description }) => ({
                  name,
                  kind,
                  domain,
                  framework,
                  description,
                })),
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.registerTool(
    "get_specialist",
    {
      title: "Get a specialist's full body",
      description:
        "Return the full system-prompt body of a specialist by name. Use the result as a persona for the " +
        "current conversation: adopt the role, follow the framework intake, apply the style rules.",
      inputSchema: {
        name: z.string().describe("The kebab-case name of the specialist (e.g., 'sales-email-writer')."),
      },
    },
    async ({ name }) => {
      const entry = specialistByName(catalog, name);
      if (!entry) {
        return {
          isError: true,
          content: [{ type: "text", text: `Unknown specialist: ${name}. Use list_specialists to browse the catalog.` }],
        };
      }
      const body = loadSpecialistBody(root, entry);
      return {
        content: [
          {
            type: "text",
            text:
              `# ${entry.name} (${entry.kind}, ${entry.domain}, framework: ${entry.framework})\n\n` +
              entry.description +
              "\n\n---\n\n" +
              body,
          },
        ],
      };
    },
  );

  server.registerTool(
    "find_specialist",
    {
      title: "Find specialists for a task",
      description:
        "Given a free-form task description, return the 1–3 best-fitting specialists from the catalog with rationale. " +
        "Pure heuristic match against names, descriptions, and domains — useful when the user describes a job and " +
        "you need to point at the right specialist.",
      inputSchema: {
        task: z.string().describe("Free-form description of what the user is trying to do."),
      },
    },
    async ({ task }) => {
      const tokens = task
        .toLowerCase()
        .split(/[^a-z0-9-]+/)
        .filter((t) => t.length >= 3);
      const scored = catalog.entries.map((e) => {
        const haystack = (e.name + " " + e.description + " " + e.domain + " " + e.framework).toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (haystack.includes(t)) score += haystack.includes(" " + t) ? 2 : 1;
          if (e.name.includes(t)) score += 3;
        }
        return { entry: e, score };
      });
      scored.sort((a, b) => b.score - a.score);
      const top = scored.filter((s) => s.score > 0).slice(0, 3);
      if (top.length === 0) {
        return {
          content: [
            {
              type: "text",
              text:
                "No specialists match that task description well. Consider applying a framework directly via " +
                "apply_framework, or describe the task in more detail (e.g., name an audience, deliverable, or domain).",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                recommendations: top.map(({ entry, score }) => ({
                  name: entry.name,
                  kind: entry.kind,
                  domain: entry.domain,
                  framework: entry.framework,
                  description: entry.description,
                  match_score: score,
                })),
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  server.registerTool(
    "list_frameworks",
    {
      title: "List prompt-engineering frameworks",
      description:
        "Return all 9 Black Book prompt-engineering frameworks with their letter mappings and primary use cases.",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text", text: JSON.stringify(FRAMEWORKS, null, 2) }],
    }),
  );

  server.registerTool(
    "apply_framework",
    {
      title: "Wrap a task in a framework",
      description:
        "Given a framework name (e.g., 'R-I-S-E') and a free-form task, return a structured prompt template " +
        "with the framework's letter slots filled in where possible, plus a list of any slots still needing input.",
      inputSchema: {
        framework: z.string().describe("Framework name: T-A-G, B-A-B, R-T-F, C-A-R-E, R-I-S-E, A-I-M, G-R-O, F-I-T, or L-E-D."),
        task: z.string().describe("Free-form description of the work."),
      },
    },
    async ({ framework, task }) => {
      const fw = FRAMEWORKS[framework];
      if (!fw) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Unknown framework: ${framework}. Valid: ${FRAMEWORK_NAMES.join(", ")}.`,
            },
          ],
        };
      }
      const slots = Object.values(fw.letters);
      const template = slots.map((s) => `**${s}:** <fill in based on task>`).join("\n");
      return {
        content: [
          {
            type: "text",
            text:
              `Framework: ${framework} (${fw.best_for})\n\n` +
              `Task: ${task}\n\n` +
              `Prompt template:\n\n\`\`\`\n${template}\n\`\`\`\n\n` +
              `Fill each slot from the task description. If any slot has no signal in the task, ask the user one targeted question.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    "prompt_bank",
    {
      title: "Generate a tailored prompt for a task",
      description:
        "Given a free-form task, pick the best specialist + their default framework, return a framework-shaped " +
        "prompt template and the recommended specialist. Replaces static prompt libraries with on-demand prompt " +
        "generation tied to the catalog.",
      inputSchema: {
        task: z.string().describe("Free-form description of the work."),
      },
    },
    async ({ task }) => {
      const tokens = task
        .toLowerCase()
        .split(/[^a-z0-9-]+/)
        .filter((t) => t.length >= 3);
      const scored = catalog.entries.map((e) => {
        const haystack = (e.name + " " + e.description).toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (haystack.includes(t)) score += 1;
          if (e.name.includes(t)) score += 3;
        }
        return { entry: e, score };
      });
      scored.sort((a, b) => b.score - a.score);
      const best = scored[0];
      if (!best || best.score === 0) {
        return {
          content: [
            {
              type: "text",
              text:
                "No matching specialist. Try apply_framework directly with a generic framework like R-I-S-E or T-A-G, " +
                "or refine the task description to mention the deliverable, audience, or domain.",
            },
          ],
        };
      }
      const fw = FRAMEWORKS[best.entry.framework];
      const slots = fw ? Object.values(fw.letters) : [];
      const template = slots.map((s) => `**${s}:** <fill in based on task>`).join("\n");
      return {
        content: [
          {
            type: "text",
            text:
              `Recommended specialist: ${best.entry.name} (${best.entry.kind}, framework: ${best.entry.framework})\n\n` +
              `${best.entry.description}\n\n` +
              `Prompt template (using ${best.entry.framework}):\n\n\`\`\`\n${template}\n\`\`\`\n\n` +
              `Fill each slot from the task. Then call get_specialist("${best.entry.name}") to load the full persona ` +
              `if you want the specialist to take over the conversation.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    "list_flows",
    {
      title: "List pre-built multi-specialist workflows",
      description:
        "Return all 13 pre-built /flow scenarios with their specialist chains. Useful for end-to-end work spanning " +
        "multiple specialists (e.g., 'launch' chains positioning → landing page → SEO → social → ads → press).",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text", text: JSON.stringify(FLOWS, null, 2) }],
    }),
  );

  server.registerTool(
    "flow",
    {
      title: "Get a specific multi-specialist workflow",
      description: "Return the chain definition for a named pre-built workflow.",
      inputSchema: {
        scenario: z.string().describe("Workflow name: launch, hire, board-update, enterprise-deal, postmortem-loop, okr-cycle, fundraise, content-engine, prd-loop, migration, qbr-prep, churn-recovery, or expansion."),
      },
    },
    async ({ scenario }) => {
      const flow = FLOWS[scenario];
      if (!flow) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Unknown flow: ${scenario}. Valid: ${Object.keys(FLOWS).join(", ")}.`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text:
              `Flow: ${scenario}\n${flow.description}\n\n` +
              `Chain:\n${flow.chain.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n` +
              `Run each specialist in order, passing context forward. Skills (consultative) come first; subagents (artifact producers) follow.`,
          },
        ],
      };
    },
  );

  // --- Resources ---------------------------------------------------------

  server.registerResource(
    "catalog",
    "black-book://catalog",
    {
      title: "Catalog",
      description: "The full Black Book catalog as JSON (all specialists with their metadata).",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(catalog, null, 2),
        },
      ],
    }),
  );

  return server;
}
