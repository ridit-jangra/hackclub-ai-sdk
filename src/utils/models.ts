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

export const hackclub_replicate_tts_models = [
  "minimax/speech-02-turbo",
  "resemble-ai/chatterbox-pro",
  "zsxkib/dia",
  "lucataco/xtts-v2",
  "qwen/qwen3-tts",
] as const;

export const hackclub_replicate_stt_models = [
  "vaibhavs10/incredibly-fast-whisper",
  "nvidia/parakeet-rnnt-1.1b",
] as const;

export const hackclub_replicate_ocr_models = [
  "cuuupid/glm-4v-9b",
  "lucataco/deepseek-ocr",
  "abiruyt/text-extract-ocr",
] as const;

export const hackclub_replicate_upscale_models = [
  "fermatresearch/magic-image-refiner",
  "recraft-ai/recraft-crisp-upscale",
  "google/upscaler",
] as const;

export const hackclub_replicate_image_util_models = [
  "lucataco/remove-bg",
  "851-labs/background-remover",
  "zsxkib/ic-light-background",
  "arielreplicate/robust_video_matting",
  "lucataco/rembg-video",
  "falcons-ai/nsfw_image_detection",
] as const;

export const hackclub_replicate_music_models = [
  "google/lyria-2",
  "meta/musicgen",
  "minimax/music-1.5",
] as const;

export const hackclub_replicate_specialized_models = [
  "retro-diffusion/rd-plus",
  "geopti/sam-audio-large",
] as const;

export type HackclubReplicateTTSModel =
  (typeof hackclub_replicate_tts_models)[number];
export type HackclubReplicateSTTModel =
  (typeof hackclub_replicate_stt_models)[number];
export type HackclubReplicateOCRModel =
  (typeof hackclub_replicate_ocr_models)[number];
export type HackclubReplicateUpscaleModel =
  (typeof hackclub_replicate_upscale_models)[number];
export type HackclubReplicateImageUtilModel =
  (typeof hackclub_replicate_image_util_models)[number];
export type HackclubReplicateMusicModel =
  (typeof hackclub_replicate_music_models)[number];
export type HackclubReplicateSpecializedModel =
  (typeof hackclub_replicate_specialized_models)[number];
export type HackclubModel = (typeof hackclub_models)[number];
export type HackclubImageModel = (typeof hackclub_image_models)[number];

export type HackclubReplicateModel =
  | HackclubReplicateTTSModel
  | HackclubReplicateSTTModel
  | HackclubReplicateOCRModel
  | HackclubReplicateUpscaleModel
  | HackclubReplicateImageUtilModel
  | HackclubReplicateMusicModel
  | HackclubReplicateSpecializedModel;

/**
 * Get all available models as an array of strings.
 * Useful for displaying available options in a UI.
 */
export function getAvailableModels(): string[] {
  return [
    ...hackclub_models,
    ...hackclub_image_models,
    ...hackclub_replicate_tts_models,
    ...hackclub_replicate_stt_models,
    ...hackclub_replicate_ocr_models,
    ...hackclub_replicate_upscale_models,
    ...hackclub_replicate_image_util_models,
    ...hackclub_replicate_music_models,
    ...hackclub_replicate_specialized_models,
  ];
}
