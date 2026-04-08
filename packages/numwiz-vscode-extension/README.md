<p align="center">
  <img src="logo.png" alt="NumWiz Logo" width="128" height="128" />
</p>

<h1 align="center">NumWiz MCP Server — VS Code Extension</h1>

VS Code extension that registers the NumWiz MCP Server, making number trivia, math facts, date facts, and year facts available to AI assistants like GitHub Copilot.

## Available Tools

| Tool | Description | Example Input |
|------|-------------|---------------|
| `numwiz_trivia` | Get trivia about any number | `{ "number": 42 }` |
| `numwiz_math` | Get math properties of a number | `{ "number": 7 }` |
| `numwiz_date` | Get historical facts for a date | `{ "month": 8, "day": 15 }` |
| `numwiz_year` | Get facts about a historical year | `{ "year": 1947 }` |
| `numwiz_random` | Get a random fact | `{ "type": "trivia" }` |
| `numwiz_batch` | Get facts for multiple numbers (max 20) | `{ "numbers": [1, 7, 42] }` |
| `numwiz_range` | Get facts for a number range (max 20) | `{ "start": 1, "end": 5 }` |
| `numwiz_is_interesting` | Analyze math properties + trivia | `{ "number": 64 }` |

## Usage Examples

Once the extension is installed, you can ask GitHub Copilot things like:

- *"Tell me something interesting about the number 42"*
- *"What happened on August 15?"*
- *"Give me a math fact about 1729"*
- *"What are some trivia facts for numbers 1 through 10?"*
- *"Is the number 8128 mathematically interesting?"*
- *"What happened in the year 1857?"*

Copilot will automatically use the NumWiz MCP tools to answer.

## Requirements

- VS Code **≥ 1.99.0** (required for the MCP Server API)
- GitHub Copilot extension

## Installation

Install from the VS Code Marketplace, or build locally:


## Troubleshooting

- **Server not visible**: Ensure VS Code is ≥ 1.99.0 (MCP API requirement)
- **Server won't start**: Check Output panel → "NumWiz MCP Server" for errors
- **No tools in Copilot**: Restart the MCP server from the MCP Servers panel

## License

[MIT](LICENSE)
