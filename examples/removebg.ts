import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

// Basic background removal
const url = await ai.removeBg(
  "https://replicate.delivery/pbxt/MAqakpYnuaS5IxU4WZAh5irkSn92wuYc5bdU1TNV5xzIJ8sM/gzp35qt55t4aatwznmccv2ssgds2.png",
);
console.log("Processed image URL:", url);

// Save result with default model
await ai.removeBg(
  "https://replicate.delivery/pbxt/MAqakpYnuaS5IxU4WZAh5irkSn92wuYc5bdU1TNV5xzIJ8sM/gzp35qt55t4aatwznmccv2ssgds2.png",
  "lucataco/remove-bg",
  {
    save: true,
    filename: "no-bg.png",
  },
);

// Using 851-labs model
await ai.removeBg(
  "https://replicate.delivery/pbxt/MAqakpYnuaS5IxU4WZAh5irkSn92wuYc5bdU1TNV5xzIJ8sM/gzp35qt55t4aatwznmccv2ssgds2.png",
  "851-labs/background-remover",
  {
    save: true,
    filename: "no-bg-alt.png",
  },
);
