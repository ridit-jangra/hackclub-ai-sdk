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
