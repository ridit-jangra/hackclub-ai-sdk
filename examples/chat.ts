import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

// Multi-turn conversation using messages
const reply = await ai.generateText("", "google/gemini-2.5-flash", {
  messages: [
    { role: "user", content: "What is TypeScript?" },
    {
      role: "assistant",
      content:
        "TypeScript is a strongly typed programming language that builds on JavaScript.",
    },
    { role: "user", content: "Give me a simple example of a typed function" },
  ],
});

console.log("Reply:", reply);

// With a system prompt
const assistant = await ai.generateText(
  "Who are you?",
  "google/gemini-2.5-flash",
  {
    systemPrompt:
      "You are a senior TypeScript engineer at a top tech company. Keep answers concise.",
  },
);

console.log("\nAssistant:", assistant);
