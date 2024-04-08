"use server";
import { connectToDatabase } from "../database/mongoose";
import Voice from '../database/models/voice.model';

/**
 * Retrieves a specific Voice  document from the database by its _id.
 * @param {string} voiceId - The _id of the voice document to retrieve.
 * @returns A promise resolved with the voice document or rejected with an error.
 */
export const getVoiceById = async (voiceId: string) => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve the document using the findById method with the provided _id.
    const voice = await Voice.findById(voiceId);

    if (!voice) {
      // If no document is found, throw an error or handle as needed.
      throw new Error('voice not found');
    }

    return JSON.parse(JSON.stringify(voice));
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve voice document:', error);
    throw error; // Rethrow or handle as needed.
  }
};