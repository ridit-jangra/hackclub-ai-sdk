# @ridit/hackclub-ai-sdk

A lightweight TypeScript SDK for the [Hack Club AI](https://ai.hackclub.com) API — **free AI credits for hackers**. Text, image, speech, music, and more with a clean, type-safe interface.

## Why use this?

- **Free credits** — Hack Club provides free AI credits to students and hackers
- **Zero config** — Just an API key, no complex setup
- **Type-safe** — Full TypeScript support with autocomplete for models and voices
- **Batteries included** — Text, streaming, images, TTS, STT, background removal, upscaling, music
- **Auto-save** — Optional disk saving across all media methods
- **Multiple models** — Access to Google, OpenAI, DeepSeek, Qwen, Replicate, and more

---

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
import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider(process.env.HACKCLUB_API_KEY ?? "");

// Generate text
const answer = await ai.generateText(
  "Explain quantum computing in simple terms",
);
console.log(answer);

// Stream text
const stream = await ai.streamText("Tell me a story");
for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

---

## API Reference

### `HackclubProvider(apiKey?: string)`

Main class. If no key is passed, falls back to `HACKCLUB_API_KEY` env variable.

```typescript
const ai = new HackclubProvider("your-api-key-here");
// or
const ai = new HackclubProvider(); // uses process.env.HACKCLUB_API_KEY
```

---

### Text

#### `generateText(prompt, model?, options?): Promise<string>`

Generates text from a prompt.

```typescript
const text = await ai.generateText("Write a haiku about TypeScript");

// With model + options
const code = await ai.generateText(
  "Write a React hook for debouncing",
  "deepseek/deepseek-v3",
  {
    systemPrompt: "You are an expert TypeScript developer",
    temperature: 0.7,
    maxSteps: 3,
    tools: { ... },
  }
);

// Multi-turn conversation
const reply = await ai.generateText("", "google/gemini-2.5-flash", {
  messages: [
    { role: "user", content: "What is TypeScript?" },
    { role: "assistant", content: "TypeScript is..." },
    { role: "user", content: "Give me an example" },
  ]
});
```

**Default model:** `google/gemini-2.5-flash`

#### `streamText(prompt, model?, options?): Promise<AsyncIterable<string>>`

Same options as `generateText`, returns a token stream.

```typescript
const stream = await ai.streamText("Tell me a story");
for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

---

### Images

#### `generateImage(prompt, model?, options?): Promise<{ url: string; mimeType: string }>`

Generates an image from a prompt.

```typescript
const { url } = await ai.generateImage("sunset over mountains");

// With options
await ai.generateImage("cinematic movie poster", undefined, {
  aspect_ratio: "21:9",
  save: true,
  filename: "movie-poster.png",
});
```

| Option         | Type      | Default                       | Description                     |
| -------------- | --------- | ----------------------------- | ------------------------------- |
| `aspect_ratio` | `string`  | `"16:9"`                      | e.g. `"1:1"`, `"4:3"`, `"21:9"` |
| `save`         | `boolean` | `false`                       | Auto-save to disk               |
| `filename`     | `string`  | `generated-{timestamp}.{ext}` | Custom filename                 |

**Default model:** `google/gemini-2.5-flash-image`

#### `removeBg(imageUrl, model?, options?): Promise<string>`

Remove the background from an image.

```typescript
const url = await ai.removeBg("https://example.com/photo.jpg");

// Save result
const url = await ai.removeBg(
  "https://example.com/photo.jpg",
  "851-labs/background-remover",
  {
    save: true,
    filename: "no-bg.png",
  },
);
```

**Available models:** `lucataco/remove-bg` (default), `851-labs/background-remover`

#### `upscale(imageUrl, model?, options?): Promise<string>`

Upscale or refine an image.

```typescript
// 4x upscale
const url = await ai.upscale(
  "https://example.com/image.png",
  "google/upscaler",
  {
    upscale_factor: "x4",
    save: true,
  },
);

// AI refinement with prompt
const url = await ai.upscale(
  "https://example.com/image.png",
  "fermatresearch/magic-image-refiner",
  {
    prompt: "UHD 4k, highly detailed",
    save: true,
  },
);
```

| Option           | Type           | Default                    | Description                                   |
| ---------------- | -------------- | -------------------------- | --------------------------------------------- |
| `upscale_factor` | `"x2" \| "x4"` | `"x2"`                     | Only for `google/upscaler`                    |
| `prompt`         | `string`       | —                          | Only for `fermatresearch/magic-image-refiner` |
| `save`           | `boolean`      | `false`                    | Auto-save to disk                             |
| `filename`       | `string`       | `upscaled-{timestamp}.png` | Custom filename                               |

**Available models:** `google/upscaler` (default), `recraft-ai/recraft-crisp-upscale`, `fermatresearch/magic-image-refiner`

---

### Audio

#### `speak(text, model?, options?): Promise<string>`

Convert text to speech. Returns a URL to the generated audio file.

```typescript
const url = await ai.speak("Hello from Hack Club!");

// With voice + save
const url = await ai.speak("Hello!", "minimax/speech-02-turbo", {
  voice: "English_CalmWoman",
  save: true,
  filename: "hello.mp3",
});
```

**Available models:** `minimax/speech-02-turbo` (default), `resemble-ai/chatterbox-pro`, `zsxkib/dia`, `lucataco/xtts-v2`, `qwen/qwen3-tts`

**Available voices (minimax):** 300+ voices across English, Chinese, Japanese, Korean, Spanish, French, German, and more. Full list in `src/utils/voices.ts`.

#### `transcribe(audioFile, model?): Promise<string>`

Transcribe audio to text. Accepts a public URL or base64 data URI.

```typescript
// From URL
const text = await ai.transcribe("https://example.com/audio.mp3");

// From local file
import { readFileSync } from "fs";
const base64 = readFileSync("audio.mp3").toString("base64");
const text = await ai.transcribe(`data:audio/mp3;base64,${base64}`);
```

**Available models:** `vaibhavs10/incredibly-fast-whisper` (default), `nvidia/parakeet-rnnt-1.1b`

---

### Music

#### `generateMusic(prompt, options?): Promise<string>`

Generate 48kHz stereo music using Google Lyria 2.

```typescript
const url = await ai.generateMusic(
  "Chill lofi beats with piano and rain sounds",
);

// Save to disk
const url = await ai.generateMusic("Epic orchestral battle music", {
  save: true,
  filename: "battle.wav",
});
```

---

## Available Models

### Text Models (`HackclubModel`)

| Model                     | Best For              |
| ------------------------- | --------------------- |
| `google/gemini-2.5-flash` | General use (default) |
| `deepseek/deepseek-v3.2`  | Code, reasoning       |
| `openai/gpt-5-mini`       | Fast, capable         |
| `moonshotai/kimi-k2.5`    | Long context          |
| `qwen/qwen3-235b-a22b`    | Multilingual          |

_Full list in `src/utils/models.ts`_

### Image Models (`HackclubImageModel`)

| Model                                   | Notes   |
| --------------------------------------- | ------- |
| `google/gemini-2.5-flash-image`         | Default |
| `google/gemini-3.1-flash-image-preview` | Latest  |

---

## Error Handling

```typescript
try {
  const result = await ai.generateText("Generate some text");
} catch (error) {
  console.error("API error:", error);
  // Handle rate limits, invalid API key, network errors, etc.
}
```

---

## Environment Setup

```bash
# .env
HACKCLUB_API_KEY=sk-hc-v1-your-key-here
```

```typescript
import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider(); // auto-reads HACKCLUB_API_KEY
```

---

## Project Structure

```
src/
├── index.ts           # Main exports
├── provider.ts        # HackclubProvider class
├── utils/
│   ├── models.ts      # Model definitions
│   ├── voices.ts      # Voice definitions
│   ├── replicate.ts   # Replicate model/input maps
│   └── url.ts         # API endpoints
└── types/
    └── types.ts       # Type definitions
```

---

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

---

## Contributing

Found a bug? Have a feature request? Open an issue or submit a PR!

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-thing`)
3. Commit changes (`git commit -m 'feat: add amazing thing'`)
4. Push (`git push origin feat/amazing-thing`)
5. Open a Pull Request

---

## License

MIT © [Ridit Jangra](https://ridit.space)

---

Built with ❤️ by [Ridit](https://github.com/ridit-jangra) for the Hack Club community.
