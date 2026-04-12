import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

// Basic TTS
const url = await ai.speak("Hello from Hack Club!");
console.log("Audio URL:", url);

// With a specific voice
await ai.speak("Welcome to the future of AI.", "minimax/speech-02-turbo", {
  voice: "English_CaptivatingStoryteller",
  save: true,
  filename: "welcome.mp3",
});

// Calm female voice
await ai.speak("Your request has been processed.", "minimax/speech-02-turbo", {
  voice: "English_CalmWoman",
  save: true,
  filename: "notification.mp3",
});

// Deep voice
await ai.speak(
  "Attention. This is an important announcement.",
  "minimax/speech-02-turbo",
  {
    voice: "English_ManWithDeepVoice",
    save: true,
    filename: "announcement.mp3",
  },
);
