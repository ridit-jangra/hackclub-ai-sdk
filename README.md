# @ridit/hackclub-ai-sdk

[npm version](https://www.npmjs.com/package/@ridit/hackclub-ai-sdk)
[License: MIT](https://opensource.org/licenses/MIT)
[Bundle size](https://bundlephobia.com/package/@ridit/hackclub-ai-sdk)

A lightweight TypeScript SDK for the [Hack Club AI](https://ai.hackclub.com) API — **free AI credits for hackers**. Get text and image generation with a clean, type-safe interface.

## Why use this?

- **Free credits** — Hack Club provides free AI credits to students and hackers
- **Zero config** — Just an API key, no complex setup
- **Type-safe** — Full TypeScript support with autocomplete for models
- **Simple API** — `generateText()` and `generateImage()` — that's it
- **Auto-save images** — Optional disk saving with custom filenames
- **Multiple models** — Access to Google, OpenAI, DeepSeek, Qwen, and more

## Quick Start

### Installation

```bash
# Using Bun (recommended)
bun add @ridit/hackclub-ai-sdk

# Or npm
npm install @ridit/hackclub-ai-sdk

# Or pnpm
pnpm add @ridit/hackclub-ai-sdk
```

### Get Your API Key

1. Go to [ai.hackclub.com](https://ai.hackclub.com)
2. Sign up / log in
3. Copy your API key from the dashboard

### Basic Usage

```typescript
import { HackclubProvider } from "hackclub-ai-sdk";

// Initialize with your API key
const ai = new HackclubProvider(process.env.API_KEY ?? "");

// Generate text
const answer = await ai.generateText("Explain quantum computing in simple terms");
console.log(answer);

// Generate and save an image
const { url } = await ai.generateImage("a cat astronaut floating in space", undefined, {
  save: true,
  filename: "space-cat.png"
});
```

## API Reference

### `HackclubProvider(apiKey: string)`

Main class for interacting with the Hack Club AI API.

```typescript
const ai = new HackclubProvider("your-api-key-here");
```

### `generateText(prompt: string, model?: HackclubModel): Promise<string>`

Generates text from a prompt.

```typescript
// Simple text generation
const text = await ai.generateText("Write a haiku about TypeScript");

// With a specific model
const code = await ai.generateText(
  "Write a React hook for debouncing",
  "deepseek/deepseek-v3" // Great for coding tasks
);
```

**Default model:** `google/gemini-2.5-flash`

### `generateImage(prompt: string, model?: HackclubImageModel, options?): Promise<{ url: string; mimeType: string }>`

Generates an image from a prompt.

```typescript
// Basic image generation
const { url, mimeType } = await ai.generateImage("sunset over mountains");

// Auto-save to disk
await ai.generateImage("cyberpunk city at night", undefined, {
  save: true // → saves as generated-1234567890.png
});

// Custom filename and aspect ratio
await ai.generateImage("cinematic movie poster", undefined, {
  aspect_ratio: "21:9",
  save: true,
  filename: "movie-poster.png"
});
```

**Default model:** `google/gemini-2.5-flash-image`

#### Image Options


| Option         | Type      | Default                       | Description                                                        |
| -------------- | --------- | ----------------------------- | ------------------------------------------------------------------ |
| `aspect_ratio` | `string`  | `"16:9"`                      | Aspect ratio of generated image (e.g., `"1:1"`, `"4:3"`, `"21:9"`) |
| `save`         | `boolean` | `false`                       | Auto-save image to disk                                            |
| `filename`     | `string`  | `generated-{timestamp}.{ext}` | Custom filename (only when `save: true`)                           |


## Available Models

### Text Models (`HackclubModel`)


| Model                     | Best For              | Notes                         |
| ------------------------- | --------------------- | ----------------------------- |
| `google/gemini-2.5-flash` | General use           | **Default**, fast and capable |
| `deepseek/deepseek-v3`    | Code, reasoning       | Great for programming tasks   |
| `openai/gpt-4o`           | Complex reasoning     | OpenAI's flagship model       |
| `qwen/qwen3.5-397b-a17b`  | Chinese, multilingual | Strong for non-English        |
| `moonshotai/kimi-k2.5`    | Long context          | Up to 128K tokens             |


*Full list in `[src/utils/models.ts](src/utils/models.ts)`*

### Image Models (`HackclubImageModel`)


| Model                                   | Notes                     |
| --------------------------------------- | ------------------------- |
| `google/gemini-2.5-flash-image`         | **Default**, high quality |
| `google/gemini-3.1-flash-image-preview` | Latest Google model       |


## Advanced Examples

### Streaming Responses (Coming Soon)

```typescript
// Future feature - stream tokens as they arrive
for await (const token of ai.streamText("Tell me a story")) {
  process.stdout.write(token);
}
```

### Error Handling

```typescript
try {
  const result = await ai.generateText("Generate some text");
} catch (error) {
  console.error("API error:", error);
  // Handle rate limits, invalid API key, etc.
}
```

> Replicate support is also coming soon!

### Environment Setup

```bash
# .env file
API_KEY=sk-hc-v1-your-key-here
```

```typescript
// In your code
import { config } from "dotenv";
config();

const ai = new HackclubProvider(process.env.API_KEY!);
```

## Project Structure

```
src/
├── index.ts          # Main exports
├── provider.ts       # HackclubProvider class
├── utils/
│   ├── models.ts    # Model definitions
│   └── url.ts       # API endpoints
└── types/
    └── types.ts     # Type definitions
```

## Development

```bash
# Clone and install
git clone https://github.com/ridit-jangra/hackclub-ai-sdk
cd hackclub-ai-sdk
bun install

# Build
bun run build

# Type check
bun run typecheck
```

## Contributing

Found a bug? Have a feature request? Open an issue or submit a PR!

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-thing`)
3. Commit changes (`git commit -m 'feat: add amazing thing'`)
4. Push (`git push origin feat/amazing-thing`)
5. Open a Pull Request

## License

MIT © [Ridit Jangra](https://ridit.space)

---

Built with ❤️ by [Ridit](https://github.com/ridit-jangra) for the Hack Club community.