# Instructions for Copilot agents

Follow these project rules:

1. Use CommonJS syntax.
2. Use Express for API code.
3. Use Vitest and Supertest for tests.
4. Every behavior change must include or update tests.
5. Error responses must use this format: { "error": "message" }.
6. Do not add a database. Keep the in-memory array.
7. Do not change unrelated files.
8. Run npm test after code changes when possible.