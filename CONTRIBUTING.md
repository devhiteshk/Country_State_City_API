# Contributing to GitStats Web

> Project by [HivarSoft](https://hivarsoft.com)

Thank you for your interest in contributing! This document explains how to get involved.

## Code of Conduct

Be respectful, inclusive, and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/) standard.

## How to Contribute

### Reporting Bugs

Open an issue and include:
- A clear description of the problem
- Steps to reproduce
- Expected vs. actual behaviour
- Browser + OS info

### Suggesting Features

Open an issue tagged `enhancement`. Describe the use case and why it would benefit other users.

### Submitting a Pull Request

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes, keeping commits focused and descriptive.
3. Ensure the project builds without errors:
   ```bash
   npm run build
   npm run type-check
   ```
4. Push your branch and open a PR against `main`.
5. Fill in the PR template — describe what changed and why.

## Development Setup

```bash
cd web
npm install
npm run dev
```

## Code Style

- TypeScript strict mode is enabled — no `any` unless unavoidable and documented.
- Chakra UI semantic tokens (`bg.surface`, `text.primary`, etc.) must be used instead of hard-coded colors.
- Components live in `src/components/` (shared) or `src/pages/` (route-level).
- Keep components focused. If a component exceeds ~200 lines, consider splitting it.
- Use named exports for all components.

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add timezone heatmap to Activity page
fix: correct line count calculation in Files page
docs: update README with API integration guide
chore: upgrade Recharts to v2.12
```

## Release Process

Releases are managed by maintainers using semantic versioning. Contributors should not bump `package.json` versions in PRs.
