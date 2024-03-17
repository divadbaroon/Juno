"use server";

import { connectToDatabase } from "../database/mongoose"; 
import Extension from '../database/models/extensions.model'; 

/**
 * Retrieves all Extension documents from the database.
 * @returns A promise resolved with all Extension documents or rejected with an error.
 */
export const getAllExtensions = async () => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve all documents using the find method with no filter.
    const allExtensions = await Extension.find({});
    return JSON.parse(JSON.stringify(allExtensions)); 
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve Extension documents:', error);
    throw error; // Rethrow or handle as needed.
  }
};
