# Agent Instructions

## Commands

- Build: `bun run build` (builds all packages via turbo)
- Lint: `bun run lint` (runs biome check)
- Lint fix: `bun run lint:fix` (runs biome check --write)
- Format: `bun run format` (runs biome format --write)
- Test: `bun run test` (runs all tests)
- Single test: `cd packages/test-node && bun test <test-file.test.ts>` (Bun test runner)
- CI: `bun run ci` (lint + build + test)

## Code Style

- Use Biome for linting and formatting: 100 char width, single quotes, no semicolons, 2 spaces, trailing commas (ES5)
- TypeScript: Avoid `any` (warn level), use explicit types for exports
- Imports: Use `.ts` extensions in import paths (e.g., `from './types.ts'`)
- Naming: camelCase for functions/variables, PascalCase for types/interfaces (prefix `I` for interfaces, `T` for type aliases)
- Error handling: TypeScript strict mode, no explicit any unless necessary
- Exports: Named exports only (no default exports)
- Files: One primary export per file matching filename (e.g., `getCountryData.ts` exports `getCountryData`)
- Format: Run `bun run format` before committing (enforced by husky pre-commit hook)
- Do not write any documentation unless it was asked for
- Do not write unnecessary comments in code, unless: code is not obvious, URLs should be linked to the issue, docs etc
