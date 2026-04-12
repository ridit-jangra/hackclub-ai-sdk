import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

// Basic music generation
const url = await ai.generateMusic(
  "Chill lofi beats with piano and rain sounds",
);
console.log("Music URL:", url);

// Epic battle music
await ai.generateMusic("Epic orchestral battle music with drums and brass", {
  save: true,
  filename: "battle.wav",
});

// Ambient
await ai.generateMusic(
  "Ambient space music, slow pads, deep bass, ethereal atmosphere",
  {
    save: true,
    filename: "space-ambient.wav",
  },
);
