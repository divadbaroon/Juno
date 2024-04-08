"use server";
import { connectToDatabase } from "../database/mongoose";
import LLM from '../database/models/llm.model';

/**
 * Retrieves a specific LLM  document from the database by its _id.
 * @param {string} llmId - The _id of the LLM  document to retrieve.
 * @returns A promise resolved with the LLM  document or rejected with an error.
 */
export const getLLMById = async (llmId: string) => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve the document using the findById method with the provided _id.
    const llm = await LLM.findById(llmId);

    if (!llm) {
      // If no document is found, throw an error or handle as needed.
      throw new Error('LLM not found');
    }

    return JSON.parse(JSON.stringify(llm));
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve LLM document:', error);
    throw error; // Rethrow or handle as needed.
  }
};