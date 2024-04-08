"use server";

import { connectToDatabase } from "../database/mongoose"; 
import Profile from '../database/models/profile.model'; 

/**
 * Retrieves all Profile documents from the database.
 * @returns A promise resolved with all LLM documents or rejected with an error.
 */
export const getAllProfiles = async () => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve all documents using the find method with no filter.
    const allProfiles = await Profile.find({});
    return JSON.parse(JSON.stringify(allProfiles)); 
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve Profile documents:', error);
    throw error; // Rethrow or handle as needed.
  }
};
