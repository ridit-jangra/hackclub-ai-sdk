import { HackclubProvider } from "./provider";

const ai = new HackclubProvider(process.env.API_KEY ?? "");

const url = await ai.speak("Hello from Hack Club!", "minimax/speech-02-turbo", {
  save: true,
  voice: "English_AnimeCharacter",
});
console.log(url);
