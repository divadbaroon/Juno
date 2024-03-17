"use server";

import { connectToDatabase } from "../database/mongoose"; // Adjust the path as necessary
import Voice from '../database/models/voice.model'; // Adjust the path as necessary to import your Voices model

/**
 * Retrieves all Voices documents from the database.
 * @returns A promise resolved with all Voices documents or rejected with an error.
 */
export const getAllVoices = async () => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve all documents using the find method with no filter.
    const allVoices = await Voice.find({});
    return JSON.parse(JSON.stringify(allVoices)); 
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve Voice documents:', error);
    throw error; // Rethrow or handle as needed.
  }
};
