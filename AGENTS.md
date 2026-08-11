<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes_tool` or `query_graph_tool` instead of Grep
- **Understanding impact**: `get_impact_radius_tool` instead of manually tracing imports
- **Code review**: `detect_changes_tool` + `get_review_context_tool` instead of reading entire files
- **Finding relationships**: `query_graph_tool` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview_tool` + `list_communities_tool`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes_tool` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context_tool` | Need source snippets for review — token-efficient |
| `get_impact_radius_tool` | Understanding blast radius of a change |
| `get_affected_flows_tool` | Finding which execution paths are impacted |
| `query_graph_tool` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes_tool` | Finding functions/classes by name or keyword |
| `get_architecture_overview_tool` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes_tool` for code review.
3. Use `get_affected_flows_tool` to understand impact.
4. Use `query_graph_tool` pattern="tests_for" to check coverage.

---

## 📱 Mobile-First Responsive Web Design Standards

All UI components and layouts across all web apps in this project MUST strictly follow these rules:

1. **Mobile-First Approach**:
   - Write base styles for mobile (<576px) first.
   - Use progressive enhancement breakpoint overrides (`sm:`, `md:`, `lg:`, `xl:`, `2xl:` in Tailwind or `@media (min-width)` in CSS) for larger screens.

2. **Standard Breakpoint Reference**:
   - **Mobile (Portrait)**: `< 576px` (Base styles)
   - **Mobile (Landscape) / Tablet (Portrait)**: `576px - 768px` (`sm:`)
   - **Tablet (Landscape) / Laptop**: `768px - 1024px` (`md:`)
   - **Desktop (Standard)**: `1024px - 1440px` (`lg:`)
   - **Ultra-Wide (Large)**: `> 1440px` (`xl:` / `2xl:`)

3. **Layout & Media Constraints**:
   - Layouts MUST use Flexbox (`flex`) or CSS Grid (`grid`). Never use hardcoded `absolute` positioning for primary content flow.
   - Use fluid/relative sizing (`%`, `rem`, `em`, `clamp()`, `vw`, `vh`) over static `px`.
   - Media: Always set `max-width: 100%; height: auto;` (prevent horizontal scrolling/overflow).

4. **Touch-Friendly & Accessibility**:
   - Touch targets for interactive elements (buttons, links, inputs) MUST be at least `44x44px` on mobile/tablet screens (`min-h-[44px] min-w-[44px]`).
   - Use accessible navigation drawers/hamburger menus on mobile viewports.

