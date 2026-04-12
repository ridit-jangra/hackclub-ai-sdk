# @ridit/hackclub-ai-sdk - Project Context

## 1. Project Overview

TypeScript SDK for the [Hack Club AI](https://ai.hackclub.com) API — free AI credits for hackers. Provides text and image generation via a clean, type-safe interface. Wraps OpenRouter and Replicate APIs with Hack Club's proxy endpoints.

## 2. Tech Stack

- **Language**: TypeScript (strict mode)
- **Runtime**: Bun (Node.js compatible)
- **Core SDKs**: `ai` (Vercel AI SDK), `@openrouter/ai-sdk-provider`, `replicate`
- **Build tool**: Bun build
- **Target**: Node.js (ES modules)

## 3. Package Manager

**Bun** — install/run commands:

```bash
bun add @ridit/hackclub-ai-sdk          # install package
bun install                       # install deps
bun run build                     # build to dist/
bun run typecheck                 # type check
bun run prepublishOnly            # pre-publish checks
```

## 4. Platform

Running on **win32** — no platform-specific code. Uses `fs` module for file saving (image generation).

## 5. Build & Dev Commands

- `bun run build` → Builds to `dist/` with bun
- `bun run typecheck` → TypeScript check only
- `bun run prepublishOnly` → Type check + build

## 6. Project Structure

```
src/
├── index.ts          # Main exports
├── provider.ts       # HackclubProvider class (main)
├── test.ts          # Tests
├── types/
│   └── types.ts     # Type definitions (currently empty)
└── utils/
    ├── models.ts    # Model arrays and types
    └── url.ts       # Base URL constants
```

## 7. Code Style

- **Imports**: ES modules, named exports preferred
- **Formatting**: No formatter config found — likely Bun's built-in
- **TypeScript**: Strict mode, `noEmit: true`, bundler resolution
- **Naming**: PascalCase classes, camelCase variables/functions, kebab-case for aspect ratios
- **Error handling**: Try/catch in generateImage for fetch failures, console.log for save notifications
- **Types**: Const assertion for model arrays (`as const`), derived union types

## 8. Architecture Notes

- **Provider pattern**: Single `HackclubProvider` class with `generateText` and `generateImage` methods
- **API integration**: Uses OpenRouter provider for text, direct fetch for image generation
- **Model management**: Centralized model lists in `utils/models.ts` with type-safe string unions
- **Image handling**: Base64 data URL parsing, optional auto-save to disk with custom filenames
- **Configuration**: Environment variable `API_KEY` required, base URLs in constants
