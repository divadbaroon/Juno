"use server";
import { connectToDatabase } from "../database/mongoose";
import Extension from '../database/models/extensions.model';

/**
 * Retrieves a specific Extension document from the database by its _id.
 * @param {string} extensionId - The _id of the Extension document to retrieve.
 * @returns A promise resolved with the Extension document or rejected with an error.
 */
export const getExtensionsById = async (extensionId : string) => {
  try {
    // Ensure the database connection is established.
    await connectToDatabase();

    // Retrieve the document using the findById method with the provided _id.
    const extension = await Extension.findById(extensionId );

    if (!extension) {
      // If no document is found, return null
      return null;
    }

    return JSON.parse(JSON.stringify(extension));
  } catch (error) {
    // Error handling
    console.error('Failed to retrieve extension document:', error);
    throw error; // Rethrow or handle as needed.
  }
};