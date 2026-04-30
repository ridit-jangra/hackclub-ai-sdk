import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createClient, createMode } from "@ridit/ai/ai";
import {
  generateText as generateTextAISDK,
  stepCountIs,
  streamText as streamTextAISDK,
  type ToolSet,
} from "ai";
import type {
  HackclubImageModel,
  HackclubReplicateImageUtilModel,
  HackclubReplicateSTTModel,
  HackclubReplicateTTSModel,
  HackclubReplicateUpscaleModel,
} from "./utils/models";
import { BASE_URL } from "./utils/url";
import Replicate from "replicate";
import type { TextOptionProps, TTSOptions } from "./types/types";
import {
  BgRemovalModelMap,
  SSTInputMap,
  SSTModelMap,
  TSSInputMap,
  TTSModelMap,
  UpscaleModelMap,
} from "./utils/replicate";
import { FileReadTool, GlobTool, GrepTool, ThinkTool } from "@ridit/ai/tools";

export class HackclubProvider {
  private replicateProvider;

  constructor(private apiKey: string = process.env.HACKCLUB_API_KEY ?? "") {
    this.replicateProvider = new Replicate({
      auth: this.apiKey,
      baseUrl: "https://ai.hackclub.com/proxy/v1/replicate",
    });
  }

  private createProvider() {
    return createOpenRouter({
      apiKey: this.apiKey,
      baseURL: BASE_URL,
    });
  }

  private async saveFile(url: string, filename: string): Promise<void> {
    const { writeFileSync } = await import("fs");
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(filename, buffer);
    console.log(`Saved to ${filename}`);
  }

  /**
   * Generate text using a specified model.
   * @param prompt - The text prompt to send to the model
   * @param model - The model to use (auto-completions available)
   * @param options - Generation options
   * @returns Promise<string> - The generated text
   */
  async generateText(
    prompt: string,
    model: string = "google/gemini-2.5-flash",
    options: TextOptionProps = {},
  ): Promise<string> {
    const { text } = await generateTextAISDK({
      model: this.createProvider()(model),
      ...(options.messages ? { messages: options.messages } : { prompt }),
      tools: options.tools,
      system: options.systemPrompt,
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
      maxRetries: options.maxRetries,
      headers: options.headers,
      toolChoice: options.toolChoice,
      onFinish: options.onFinish,
      onStepFinish: options.onStepFinish,
      output: options.output,
      timeout: options.timeout,
      experimental_onToolCallStart: options.experimental_onToolCallStart,
      experimental_onToolCallFinish: options.experimental_onToolCallFinish,
      ...(options.maxSteps ? { stopWhen: stepCountIs(options.maxSteps) } : {}),
    });

    return text;
  }

  /**
   * Stream text using a specified model.
   * @param prompt - The text prompt to send to the model
   * @param model - The model to use (auto-completions available)
   * @param options - Generation options
   * @returns Promise<AsyncIterable<string>> - A stream of text chunks
   * @example
   * const stream = await ai.streamText("Tell me a story");
   * for await (const chunk of stream) {
   *   process.stdout.write(chunk);
   * }
   */
  async streamText(
    prompt: string,
    model: string = "google/gemini-2.5-flash",
    options: TextOptionProps = {},
  ) {
    const result = await streamTextAISDK({
      model: this.createProvider()(model),
      ...(options.messages ? { messages: options.messages } : { prompt }),
      tools: options.tools,
      system: options.systemPrompt,
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
      maxRetries: options.maxRetries,
      headers: options.headers,
      toolChoice: options.toolChoice,
      onFinish: options.onFinish,
      onStepFinish: options.onStepFinish,
      output: options.output,
      timeout: options.timeout,
      experimental_onToolCallStart: options.experimental_onToolCallStart,
      experimental_onToolCallFinish: options.experimental_onToolCallFinish,
      ...(options.maxSteps ? { stopWhen: stepCountIs(options.maxSteps) } : {}),
    });

    return result.textStream;
  }

  /**
   * Generate an image using a specified model.
   * @param prompt - The text prompt to send to the model
   * @param model - The model to use (auto-completions available)
   * @param options - Generation options
   * @param options.tools - The tools that the agent has access to
   * @returns Promise<string> - The generated text
   */
  async createAgent(
    prompt: string,
    model: string,
    opts: {
      tools: ToolSet;
    } = { tools: { FileReadTool, ThinkTool, GlobTool, GrepTool } },
  ) {
    const mode = createMode("hackclub-ai-mode", opts.tools);
    const agent = createClient({
      provider: this.createProvider()(model),
      mode,
    });

    const { text } = await agent.run({ prompt });

    return text;
  }

  /**
   * Generate an image using a specified model.
   * @param prompt - The text prompt to send to the model
   * @param model - The model to use (auto-completions available)
   * @param options - Generation options
   * @param options.aspect_ratio - Aspect ratio of the generated image (e.g. "16:9", "1:1")
   * @param options.save - Whether to automatically save the image to disk
   * @param options.filename - Custom filename for the saved image
   * @returns Promise<{ url: string; mimeType: string }> - The generated image data URL and mime type
   */
  async generateImage(
    prompt: string,
    model: HackclubImageModel = "google/gemini-2.5-flash-image",
    options: { aspect_ratio?: string; save?: boolean; filename?: string } = {},
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
          model,
          messages: [{ role: "user", content: prompt }],
          modalities: ["image", "text"],
          image_config: { aspect_ratio: options.aspect_ratio ?? "16:9" },
        }),
      },
    );

    const data = (await response.json()) as any;
    const imageData = data.choices[0].message.images[0].image_url;
    const url = imageData.url;
    const mimeType = url.match(/^data:([^;]+)/)?.[1] ?? "image/png";

    if (options.save) {
      const { writeFileSync } = await import("fs");
      const ext = mimeType.split("/")[1];
      const finalName = options.filename ?? `generated-${Date.now()}.${ext}`;
      const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
      writeFileSync(finalName, Buffer.from(base64Data, "base64"));
      console.log(`Saved to ${finalName}`);
    }

    return { url, mimeType };
  }

  /**
   * Transcribe audio to text using a specified model.
   * @param audioFile - URL or base64 data URI of the audio file
   * @param model - The STT model to use (auto-completions available)
   * @returns Promise<string> - The transcribed text
   * @example
   * const text = await ai.transcribe("https://example.com/audio.mp3");
   */
  async transcribe(
    audioFile: string,
    model: HackclubReplicateSTTModel = "vaibhavs10/incredibly-fast-whisper",
  ): Promise<string> {
    const output = await this.replicateProvider.run(SSTModelMap[model], {
      input: { [SSTInputMap[model]]: audioFile, batch_size: 64 },
    });

    return (output as any).text;
  }

  /**
   * Convert text to speech using a specified model.
   * @param text - The text to convert to speech
   * @param model - The TTS model to use (auto-completions available)
   * @param options - Generation options including voice and save settings
   * @returns Promise<string> - URL to the generated audio file
   * @example
   * const url = await ai.speak("Hello from Hack Club!", "minimax/speech-02-turbo", {
   *   voice: "English_CalmWoman",
   *   save: true,
   * });
   */
  async speak<T extends HackclubReplicateTTSModel>(
    text: string,
    model: T = "minimax/speech-02-turbo" as T,
    options: TTSOptions<T> = {},
  ): Promise<string> {
    const output = await this.replicateProvider.run(TTSModelMap[model], {
      input: {
        [TSSInputMap[model]]: text,
        ...(options.voice ? { voice_id: options.voice } : {}),
      },
    });

    const url = (output as any).url() as string;
    if (options.save) {
      await this.saveFile(url, options.filename ?? `tts-${Date.now()}.mp3`);
    }
    return url;
  }

  /**
   * Remove the background from an image.
   * @param imageUrl - URL of the image to process
   * @param model - The background removal model to use
   * @param options - Options for saving the output
   * @returns Promise<string> - URL of the processed image
   * @example
   * const url = await ai.removeBg("https://example.com/photo.jpg");
   */
  async removeBg(
    imageUrl: string,
    model: HackclubReplicateImageUtilModel = "lucataco/remove-bg",
    options: { save?: boolean; filename?: string } = {},
  ): Promise<string> {
    const output = await this.replicateProvider.run(BgRemovalModelMap[model]!, {
      input: { image: imageUrl },
    });

    const url = (output as any).url() as string;
    if (options.save) {
      await this.saveFile(
        url,
        options.filename ?? `bg-removed-${Date.now()}.png`,
      );
    }
    return url;
  }

  /**
   * Upscale or refine an image using a specified model.
   * @param imageUrl - URL of the image to upscale
   * @param model - The upscale model to use
   * @param options - Model-specific options including scale factor and prompt
   * @returns Promise<string> - URL of the upscaled image
   * @example
   * const url = await ai.upscale("https://example.com/image.png", "google/upscaler", {
   *   upscale_factor: "x4"
   * });
   */
  async upscale(
    imageUrl: string,
    model: HackclubReplicateUpscaleModel = "google/upscaler",
    options: {
      upscale_factor?: "x2" | "x4";
      prompt?: string;
      save?: boolean;
      filename?: string;
    } = {},
  ): Promise<string> {
    const input: Record<string, any> = { image: imageUrl };
    if (model === "google/upscaler")
      input.upscale_factor = options.upscale_factor ?? "x2";
    if (model === "fermatresearch/magic-image-refiner" && options.prompt)
      input.prompt = options.prompt;

    const output = await this.replicateProvider.run(UpscaleModelMap[model]!, {
      input,
    });
    const url = Array.isArray(output)
      ? ((output[0] as any).url() as string)
      : ((output as any).url() as string);

    if (options.save) {
      await this.saveFile(
        url,
        options.filename ?? `upscaled-${Date.now()}.png`,
      );
    }
    return url;
  }

  /**
   * Generate music from a text prompt using Google Lyria 2.
   * @param prompt - Description of the music to generate
   * @param options - Generation options
   * @returns Promise<string> - URL of the generated audio file
   * @example
   * const url = await ai.generateMusic("Chill lofi beats with piano and rain sounds");
   */
  async generateMusic(
    prompt: string,
    options: { save?: boolean; filename?: string } = {},
  ): Promise<string> {
    const output = await this.replicateProvider.run("google/lyria-2", {
      input: { prompt },
    });

    const url = (output as any).url() as string;
    if (options.save) {
      await this.saveFile(url, options.filename ?? `music-${Date.now()}.wav`);
    }
    return url;
  }
}
