"use server";
import { connectToDatabase } from "../database/mongoose";
import Prompt from '../database/models/prompt.model';

/**
 * Retrieves a specific prompt document from the database by its _id.
 * @param {string} promptId - The _id of the prompt document to retrieve.
 * @returns A promise resolved with the voice document or rejected with an error.
 */
export const getPromptById = async (promptId: string) => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve the document using the findById method with the provided _id.
    const prompt = await Prompt.findById(promptId);

    if (!prompt) {
      // If no document is found, throw an error or handle as needed.
      throw new Error('prompt not found');
    }

    return JSON.parse(JSON.stringify(prompt));
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve prompt document:', error);
    throw error; // Rethrow or handle as needed.
  }
};