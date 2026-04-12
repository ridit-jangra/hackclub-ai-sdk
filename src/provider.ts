import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText as generateTextAISDK } from "ai";
import type { HackclubImageModel, HackclubModel } from "./utils/models";
import { BASE_URL } from "./utils/url";
import Replicate from "replicate";

/**
 * Main provider for the Hackclub AI SDK.
 */
export class HackclubProvider {
  private replicateProvider;

  constructor(private apiKey: string) {
    this.replicateProvider = new Replicate({
      baseUrl: "https://ai.hackclub.com/proxy/v1/replicate",
    });
  }

  /**
   * Generate text using a specified model.
   * @param prompt - The text prompt to send to the model
   * @param model - The model to use (auto-completions available)
   * @returns Promise<string> - The generated text
   */
  async generateText(
    prompt: string,
    model: HackclubModel = "google/gemini-2.5-flash",
  ): Promise<string> {
    const provider = createOpenRouter({
      apiKey: this.apiKey,
      baseURL: BASE_URL,
    });
    const { text } = await generateTextAISDK({
      model: provider(model),
      prompt,
    });

    return text;
  }

  /**
   * Generate an image using a specified model.
   * @param prompt - The text prompt to send to the model
   * @param model - The model to use (auto-completions available)
   * @param options - Generation options
   * @param options.aspect_ratio - Aspect ratio of the generated image (e.g. "16:9", "1:1")
   * @param options.save - Whether to automatically save the image to disk
   * @param options.filename - Custom filename for the saved image (defaults to "generated-{timestamp}.{ext}")
   * @returns Promise<{ url: string; mimeType: string }> - The generated image data URL and mime type
   */
  async generateImage(
    prompt: string,
    model: HackclubImageModel = "google/gemini-2.5-flash-image",
    {
      aspect_ratio = "16:9",
      save = false,
      filename,
    }: { aspect_ratio?: string; save?: boolean; filename?: string } = {},
  ) {
    const response = await fetch(
      "https://ai.hackclub.com/proxy/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: prompt }],
          modalities: ["image", "text"],
          image_config: {
            aspect_ratio,
          },
        }),
      },
    );

    const data = (await response.json()) as unknown as any;

    const imageData = data.choices[0].message.images[0].image_url;
    const url = imageData.url;
    const mimeType = url.match(/^data:([^;]+)/)?.[1] ?? "image/png";

    if (save) {
      const { writeFileSync } = await import("fs");
      const ext = mimeType.split("/")[1];
      const finalName = filename ?? `generated-${Date.now()}.${ext}`;
      const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
      writeFileSync(finalName, Buffer.from(base64Data, "base64"));
      console.log(`Saved to ${finalName}`);
    }

    return { url, mimeType };
  }
}
