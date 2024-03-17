"use server";

import { connectToDatabase } from "../database/mongoose"; // Adjust the path as necessary
import LLM from '../database/models/llm.model'; // Adjust the path as necessary to import your LLM model

/**
 * Retrieves all LLM documents from the database.
 * @returns A promise resolved with all LLM documents or rejected with an error.
 */
export const getAllLLMs = async () => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve all documents using the find method with no filter.
    const allLLMs = await LLM.find({});
    return JSON.parse(JSON.stringify(allLLMs)); 
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve LLM documents:', error);
    throw error; // Rethrow or handle as needed.
  }
};
