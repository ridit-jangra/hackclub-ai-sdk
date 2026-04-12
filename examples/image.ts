import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

// With aspect ratio + save
await ai.generateImage(
  "cinematic movie poster of a futuristic city",
  undefined,
  {
    aspect_ratio: "21:9",
    save: true,
    filename: "movie-poster.png",
  },
);
