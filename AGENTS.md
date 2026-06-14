# Agent Instructions

## Commands

- Build: `bun run build` (builds all packages via turbo)
- Lint: `bun run lint` (runs biome check)
- Lint fix: `bun run lint:fix` (runs biome check --write)
- Format: `bun run format` (runs biome format --write)
- Test: `bun run test` (runs all tests)
- Single test: `cd packages/test-js && bun test <test-file.test.ts>` (Bun test runner)
- CI: `bun run ci` (lint + build + test)
- Version bump: `cd packages/scripts && bun run version <semver>` (updates package.json files + composer.json + lock file)

## Release Flow

1. Bump version: `cd packages/scripts && bun run version X.Y.Z`
2. Rebuild dist: `bun run build`
3. Verify: `bun run ci`
4. Commit all changes: `chore(release): vX.Y.Z`
5. Push: `git push`
6. Create GitHub release: `gh release create vX.Y.Z` (this creates the git tag and triggers npm publish via `.github/workflows/publish-npm.yml`)

## Pull Requests

- **Do not commit generated `dist/` in PRs.** The build output (`*.min.json`, `cjs/`, `mjs/`, `*.iife.js`, `*.d.ts`, `data.sql`, `*.csv`) is rebuilt and committed only during the Release Flow. Run `bun run build` / `bun run ci` to verify a change builds, but exclude generated `dist/` files from PR commits — committing them wastes review time and causes merge conflicts.
- Exceptions: `dist/package.json` and `dist/index.php` are hand-maintained (not build output), so edit and commit them with the change.

## Code Style

- Use Biome for linting and formatting: 100 char width, single quotes, no semicolons, 2 spaces, trailing commas (ES5)
- TypeScript: Avoid `any` (warn level), use explicit types for exports
- Imports: Use `.ts` extensions in import paths (e.g., `from './types.ts'`)
- Naming: camelCase for functions/variables, PascalCase for types/interfaces (prefix `I` for interfaces, `T` for type aliases)
- Error handling: TypeScript strict mode, no explicit any unless necessary
- Exports: Named exports only (no default exports)
- Files: One primary export per file matching filename (e.g., `getCountryData.ts` exports `getCountryData`)
- Format: Run `bun run format` before committing (enforced by lefthook pre-commit hook)
- Code should be clear and self-explanatory as much as possible
- Do not write any documentation unless it was asked for
- Do not write unnecessary comments in code, unless: code is not obvious, URLs should be linked to the issue, docs etc
