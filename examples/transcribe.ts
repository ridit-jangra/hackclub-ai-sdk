import { HackclubProvider } from "@ridit/hackclub-ai-sdk";
import { readFileSync } from "fs";

const ai = new HackclubProvider();

// From a public URL
const text = await ai.transcribe(
  "https://cdn.pixabay.com/audio/2022/03/14/audio_956d104be2.mp3",
);
console.log("Transcription:", text);

// From a local file (base64)
// const audio = readFileSync("audio.mp3");
// const base64 = audio.toString("base64");
// const localText = await ai.transcribe(`data:audio/mp3;base64,${base64}`);
// console.log("Local transcription:", localText);
