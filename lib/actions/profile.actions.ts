import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Profile from "../database/models/profile.model";

// CREATE
export async function createProfile(profile: CreateProfileParams) {
  try {
    await connectToDatabase();

    const newProfile = await Profile.create(profile);

    return JSON.parse(JSON.stringify(newProfile));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getProfileById(profileId: string) {
  try {
    await connectToDatabase();

    const profile = await Profile.findById(profileId);

    if (!profile) throw new Error("Profile not found");

    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateProfile(profileId: string, profile: UpdateProfileParams) {
  try {
    await connectToDatabase();

    const updatedProfile = await Profile.findByIdAndUpdate(profileId, profile, {
      new: true,
    });

    if (!updatedProfile) throw new Error("Profile update failed");

    return JSON.parse(JSON.stringify(updatedProfile));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteProfile(profileId: string) {
  try {
    await connectToDatabase();

    const deletedProfile = await Profile.findByIdAndDelete(profileId);

    if (!deletedProfile) throw new Error("Profile not found");

    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletedProfile));
  } catch (error) {
    handleError(error);
  }
}