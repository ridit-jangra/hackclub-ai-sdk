/**
 * Array of all available models in the Hackclub AI SDK.
 * Use this for runtime validation or listing available models.
 */
export const hackclub_models = [
  // OpenAI
  "openai/gpt-5-mini",
  "openai/gpt-oss-120b",

  // Google
  "google/gemini-2.5-flash",
  "google/gemini-2.5-flash-lite-preview-09-2025",
  "google/gemini-3-flash-preview",

  // Qwen
  "qwen/qwen3-32b",
  "qwen/qwen3-next-80b-a3b-instruct",
  "qwen/qwen3.5-397b-a17b",
  "qwen/qwen3-235b-a22b",
  "qwen/qwen3-235b-a22b-instruct-2507",
  "qwen/qwen3-vl-235b-a22b-instruct",

  // MoonshotAI (Kimi)
  "moonshotai/kimi-k2.5",
  "moonshotai/kimi-k2-thinking",
  "moonshotai/kimi-k2-0905",

  // Xiaomi
  "xiaomi/mimo-v2-omni",
  "xiaomi/mimo-v2-pro",

  // Minimax
  "minimax/minimax-m2.5",
  "minimax/minimax-m2.1",
  "minimax/minimax-m2-her",

  // Z-AI (GLM)
  "z-ai/glm-5",
  "z-ai/glm-4.6",
  "z-ai/glm-4.7-flash",
  "z-ai/glm-4.7",

  // DeepSeek
  "deepseek/deepseek-v3.2-speciale",
  "deepseek/deepseek-v3.2",
  "deepseek/deepseek-v3.2-exp",
  "deepseek/deepseek-r1-0528",
  "deepseek/deepseek-r1-distill-qwen-32b",

  // X-AI (Grok)
  "x-ai/grok-4.1-fast",

  // NVIDIA
  "nvidia/nemotron-nano-12b-v2-vl",

  // ByteDance
  "bytedance-seed/seed-1.6-flash",

  // Liquid
  "liquid/lfm-2-24b-a2b",

  // Morph
  "morph/morph-v3-large",
  "morph/morph-v3-fast",
] as const;

export const hackclub_image_models = [
  // Google
  "google/gemini-2.5-flash-image",
  "google/gemini-3.1-flash-image-preview",
] as const;

export type HackclubModel = (typeof hackclub_models)[number];

export type HackclubImageModel = (typeof hackclub_image_models)[number];

/**
 * Get all available models as an array of strings.
 * Useful for displaying available options in a UI.
 */
export function getAvailableModels(): string[] {
  return [...hackclub_models, ...hackclub_image_models];
}
