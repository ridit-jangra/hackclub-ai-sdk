import { HackclubProvider } from "@ridit/hackclub-ai-sdk";
import { tool } from "ai";
import { z } from "zod";

const ai = new HackclubProvider();

const result = await ai.generateText(
  "What's the weather like in Delhi and Mumbai?",
  "google/gemini-2.5-flash",
  {
    maxSteps: 3,
    tools: {
      getWeather: tool({
        description: "Get the current weather for a city",
        parameters: z.object({
          city: z.string().describe("The city name"),
        }),
        execute: async ({ city }) => {
          // Replace with a real weather API call
          const fakeData: Record<string, string> = {
            Delhi: "38°C, sunny and humid",
            Mumbai: "32°C, partly cloudy",
          };
          return { weather: fakeData[city] ?? "Unknown" };
        },
      }),
    },
  },
);

console.log("Result:", result);
