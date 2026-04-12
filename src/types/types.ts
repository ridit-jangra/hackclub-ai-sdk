import {
  type GenerateTextOnFinishCallback,
  type GenerateTextOnStepFinishCallback,
  type GenerateTextOnToolCallFinishCallback,
  type OnToolCallStartEvent,
  type TimeoutConfiguration,
  type Tool,
  type ToolChoice,
  type ModelMessage,
} from "ai";
import type { HackclubReplicateTTSModel } from "../utils/models";
import type { MinimaxVoice, QwenVoice } from "../utils/voices";

export interface TextOptionProps {
  maxSteps?: number;
  tools?: Record<string, Tool>;
  experimental_onToolCallStart?: (
    event: OnToolCallStartEvent<NoInfer<Record<string, Tool>>>,
  ) => void;
  experimental_onToolCallFinish?:
    | GenerateTextOnToolCallFinishCallback<NoInfer<Record<string, Tool>>>
    | undefined;
  systemPrompt?: string;
  headers?: Record<string, string | undefined> | undefined;
  toolChoice?: ToolChoice<NoInfer<Record<string, Tool>>> | undefined;
  maxOutputTokens?: number | undefined;
  maxRetries?: number | undefined;
  messages?: ModelMessage[] | undefined;
  onFinish?:
    | GenerateTextOnFinishCallback<NoInfer<Record<string, Tool>>>
    | undefined;
  output?: any | undefined;
  temperature?: number | undefined;
  timeout?: TimeoutConfiguration | undefined;
  onStepFinish?:
    | GenerateTextOnStepFinishCallback<NoInfer<Record<string, Tool>>>
    | undefined;
}

export type TTSOptions<T extends HackclubReplicateTTSModel> = {
  save?: boolean;
  filename?: string;
  voice?: T extends "minimax/speech-02-turbo"
    ? MinimaxVoice
    : T extends "qwen/qwen3-tts"
      ? QwenVoice
      : never;
};
