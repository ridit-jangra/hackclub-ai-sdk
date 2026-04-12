import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

const IMAGE_URL =
  "https://replicate.delivery/xezq/iwN5atioJTYgGVzVonhdDfbQZznTSBFTqmfh5WY84gP05XMUA/tmp7k57elxf.png";

// 2x upscale (default)
const url = await ai.upscale(IMAGE_URL);
console.log("Upscaled URL:", url);

// 4x upscale with google
await ai.upscale(IMAGE_URL, "google/upscaler", {
  upscale_factor: "x4",
  save: true,
  filename: "upscaled-4x.png",
});

// Crisp upscale (recraft)
await ai.upscale(IMAGE_URL, "recraft-ai/recraft-crisp-upscale", {
  save: true,
  filename: "upscaled-crisp.webp",
});

// AI refinement with prompt
await ai.upscale(IMAGE_URL, "fermatresearch/magic-image-refiner", {
  prompt: "UHD 4k, highly detailed, sharp focus, professional photography",
  save: true,
  filename: "upscaled-refined.png",
});
