import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Prompt from "../database/models/prompt.model";

// CREATE
export async function createPrompt(promptData: CreatePromptParams) {
  try {
    await connectToDatabase();

    const newPrompt = await Prompt.create(promptData);

    return JSON.parse(JSON.stringify(newPrompt));
  } catch (error) {
    handleError(error);
  }
}
