import type {
  HackclubReplicateSTTModel,
  HackclubReplicateTTSModel,
} from "./models";

export const SSTInputMap: Record<HackclubReplicateSTTModel, string> = {
  "vaibhavs10/incredibly-fast-whisper": "audio",
  "nvidia/parakeet-rnnt-1.1b": "audio_file",
};

export const TSSInputMap: Record<HackclubReplicateTTSModel, string> = {
  "resemble-ai/chatterbox-pro": "prompt",
  "minimax/speech-02-turbo": "text",
  "zsxkib/dia": "text",
  "lucataco/xtts-v2": "speaker",
  "qwen/qwen3-tts": "text",
};

export const SSTModelMap: Record<
  HackclubReplicateSTTModel,
  `${string}/${string}`
> = {
  "vaibhavs10/incredibly-fast-whisper":
    "vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
  "nvidia/parakeet-rnnt-1.1b":
    "nvidia/parakeet-rnnt-1.1b:73ddbebaef172a47c8dfdd79381f110bfdc7691bcc7a4edde82f0a39e380ce50",
};

export const TTSModelMap: Record<
  HackclubReplicateTTSModel,
  `${string}/${string}`
> = {
  "zsxkib/dia":
    "zsxkib/dia:2119e338ca5c0dacd3def83158d6c80d431f2ac1024146d8cca9220b74385599",
  "resemble-ai/chatterbox-pro": "resemble-ai/chatterbox-pro",
  "minimax/speech-02-turbo": "minimax/speech-02-turbo",
  "lucataco/xtts-v2":
    "lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e",
  "qwen/qwen3-tts": "qwen/qwen3-tts",
};

export const BgRemovalModelMap: Record<string, `${string}/${string}`> = {
  "lucataco/remove-bg":
    "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
  "851-labs/background-remover":
    "851-labs/background-remover:a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc",
};

export const UpscaleModelMap: Record<string, `${string}/${string}`> = {
  "google/upscaler": "google/upscaler",
  "recraft-ai/recraft-crisp-upscale": "recraft-ai/recraft-crisp-upscale",
  "fermatresearch/magic-image-refiner":
    "fermatresearch/magic-image-refiner:507ddf6f977a7e30e46c0daefd30de7d563c72322f9e4cf7cbac52ef0f667b13",
};
