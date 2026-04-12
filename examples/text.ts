import { HackclubProvider } from "@ridit/hackclub-ai-sdk";

const ai = new HackclubProvider();

// Basic text generation
const answer = await ai.generateText(
  "Explain quantum computing in simple terms",
);
console.log("Answer:", answer);

// With a specific model
const code = await ai.generateText(
  "Write a React hook for debouncing",
  "deepseek/deepseek-v3.2",
);
console.log("Code:", code);

// Streaming
console.log("\nStreaming a story:\n");
const stream = await ai.streamText("Tell me a short story about a robot");
for await (const chunk of stream) {
  process.stdout.write(chunk);
}
