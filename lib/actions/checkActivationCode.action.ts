"use server";
import Code, { ICODE } from "../database/models/activationCode.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// READ
export async function validateActivationCode(code: number): Promise<string | null> {
  try {
    await connectToDatabase();

    const validCode: ICODE | null = await Code.findOne({
      code: code,
      usesLeft: { $gt: 0 },
      plan: { $exists: true }
    });

    if (validCode) {
      // Decrement the usesLeft by 1
      validCode.usesLeft -= 1;
      await validCode.save();
      return validCode.plan;
    }

    return null;
  } catch (error) {
    handleError(error);
    return null;
  }
}