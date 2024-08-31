"use server";

import { createPrompt } from "./prompt.actions";

export const createPromptAction = async (promptData: CreatePromptParams) => {
  try {
    const newPrompt = await createPrompt(promptData);
    return newPrompt;
  } catch (error) {
    throw new Error(`Error creating prompt: ${error}`);
  }
};