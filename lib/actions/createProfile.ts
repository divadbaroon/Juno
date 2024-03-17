"use server";

import { createProfile } from "./profile.actions";

export const createProfileAction = async (profileData: CreateProfileParams) => {
  try {
    const newProfile = await createProfile(profileData);
    return newProfile;
  } catch (error) {
    throw new Error(`Error creating profile: ${error}`);
  }
};