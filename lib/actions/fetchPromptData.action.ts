"use server";

import { connectToDatabase } from "../database/mongoose"; 
import Prompt from '../database/models/prompt.model'; 

/**
 * Retrieves all Prompts documents from the database.
 * @returns A promise resolved with all prompt documents or rejected with an error.
 */
export const getAllPrompts = async () => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve all documents using the find method with no filter.
    const allPrompts = await Prompt.find({});
    return JSON.parse(JSON.stringify(allPrompts)); 
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve Profile documents:', error);
    throw error; // Rethrow or handle as needed.
  }
};
