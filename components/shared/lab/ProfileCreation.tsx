"use client";
import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LibraryPage } from "@/components/shared/library/LibraryPage"

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createProfileAction } from "../../../lib/actions/createProfile";

import { Separator } from "@/components/ui/separator"

// Define your form schemas
const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
});
const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export const ProfileCreation = () => {
  // State hooks to show fields
  const [showBasicDetails, setShowBasicDetails] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [showLargeLanguageModel, setShowLargeLanguageModel] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // State hooks to store form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [llm, setLLM] = useState("");
  const [personality, setPersonality] = useState("");
  const [role, setRole] = useState("");
  const [persona, setPersona] = useState("");
  const [interactionGuidelines, setInteractionGuidelines] = useState("");
  const [voice, setVoice] = useState("");
  const [sharePreference, setSharePreference] = useState("");
  const [extensions, setExtensions] = useState([]);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleCreateProfile = async () => {
    const profileData: CreateProfileParams = {
      name,
      description,
      llm: llm || "GPT-3",
      personality,
      role,
      persona,
      interactionGuidelines,
      voice: voice || "Standard",
      sharePreference,
      extensions,
      photo,
    };

    try {
      await createProfileAction(profileData);
    } catch (error) {
      console.error("Error creating profile");
    }
  };

 // Form hooks
 const usernameForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });
  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  });

  // Component return
  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-25px' }}>Profile Creation</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Craft your perfect AI companion from the ground up, tailoring every detail to your preferences.
      </p>
      <Separator className="my-4" />

      <div onClick={() => setShowLargeLanguageModel(!showLargeLanguageModel)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">LLM Selection</h2>
      </div>
      {showLargeLanguageModel && <LibraryPage 
                contextType = "Lab"
                libraryType="LLMs"
                h2Text="" 
                pText="Select the Large-Language Model (LLM) that will power your AI's natural language understanding and generation capabilities."
      />}

    <div onClick={() => setShowProfileCreation(!showProfileCreation)}
              className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">LLM Configuration</h2>
            
          </div>
          {showProfileCreation && (
          <div className="forms-container space-y-8 mt-5"> {/* Updated container for vertical layout */}
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Fine-tune your selected LLM to align with your AI&apos;s intended behavior and identity.
            </p>
      
            <FormProvider {...emailForm}>
              <form className="space-y-8">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Personality</FormLabel>
                      <FormDescription style={{ marginTop: '.2rem' }}>             
                        Define the personality traits of your AI.
                      </FormDescription>
                      <FormControl>
                        <Input 
                        placeholder="Friendly"
                        value={personality}
                        onChange={(e) => setPersonality(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Role</FormLabel>
                      <FormDescription style={{ marginTop: '.2rem' }}>             
                        Function or job of the AI within interactions
                      </FormDescription>
                      <FormControl>
                        <Input 
                        placeholder="Assistant"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Persona</FormLabel>
                      <FormDescription style={{ marginTop: '.2rem' }}>
                        The archetype your AI will embody.
                      </FormDescription>
                      <FormControl>
                      <Input 
                        placeholder="Barack Obama"
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

          <FormProvider {...emailForm}>
            <form className="space-y-8">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Interaction Guidelines</FormLabel>
                    <FormDescription style={{ marginTop: '.2rem' }}>             
                      Set guidelines on how your AI communicates with you
                    </FormDescription>
                    <FormControl>
                    <Input 
                        placeholder="Only respond in a poetic manner"
                        value={interactionGuidelines}
                        onChange={(e) => setInteractionGuidelines(e.target.value)}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>
            </div>
          )}
      
      {/* Voice Section */}
      <div onClick={() => setShowVoice(!showVoice)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Select Voice</h2>
      </div>
      {showVoice && <LibraryPage 
        contextType = "Lab"
        libraryType="Voices"
        h2Text="" 
        pText="Give your AI a unique voice that complements its personality and enhances the user experience."
      />}
    
      {/* Extensions Section */}
      <div onClick={() => setShowExtensions(!showExtensions)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Add Extensions</h2>
      </div>
      {showExtensions && <LibraryPage 
        contextType = "Lab"
        libraryType="Extensions"
        h2Text="" 
        pText="Enhance the capabilities of your AI by adding extensions that provide additional features and functionalities."
      />}

      <div onClick={() => setShowBasicDetails(!showBasicDetails)}
           className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Profile Details</h2>
        
        </div>
        {showBasicDetails && (
        <div className="forms-container space-y-8 mt-5">
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Provide the details that will be initially shown on your AI profile.
            </p>

            <FormProvider {...usernameForm}>
                <form className="mb-8 space-y-8">
                    <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold">Name</FormLabel>
                        <FormDescription style={{ marginTop: '.2rem' }}>
                            The name of your profile.
                        </FormDescription>
                        <FormControl>
                        <Input 
                          placeholder="Juno"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    </form>
                </FormProvider>

                <FormProvider {...usernameForm}>
                <form className="mb-8 space-y-8">
                    <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold">Description</FormLabel>
                        <FormDescription style={{ marginTop: '.2rem' }}>
                            Describe your profile.
                        </FormDescription>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...field}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    </form>
                </FormProvider>
                <FormProvider {...usernameForm}>
                <form className="mb-8 space-y-8">
                    <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-bold">Profile photo (optional)</FormLabel>
                        <FormDescription style={{ marginTop: '.2rem' }}>
                            Upload a profile photo to represent your profile.
                        </FormDescription>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="profile-photo"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files.length > 0) {
                                        setPhoto(e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                    </form>
                </FormProvider>
            </div>
        )}

        <div onClick={() => setShowShare(!showShare)}
                    className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
                    <h2 className="text-lg font-bold text-dark-600">Share Preference</h2>
                </div>
            {showShare && (

            <FormProvider {...usernameForm}>
            <form className="mb-8 space-y-8">
                <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormDescription style={{ marginTop: '.2rem' }}>
                      Determine the level of access and visibility for your newly created AI profile.
                    </FormDescription>
                        <fieldset>
                        <div className="mt-3 space-y-6">
                            <div className="flex items-center gap-x-3">
                            <input
                                id="push-global"
                                name="global"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                checked={sharePreference === 'global'}
                                onChange={() => setSharePreference('global')}
                              />
                                <div className="text-sm leading-6">
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Share Globally</label>
                                    <p className="text-gray-500">Allow anyone to discover and interact with your profile.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-3">
                                  <input
                                      id="push-global"
                                      name="friends"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      checked={sharePreference === 'friends'}
                                      onChange={() => setSharePreference('friends')}
                                    />                                <div className="text-sm leading-6">
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Share With Friends</label>
                                    <p className="text-gray-500">Grant access exclusively to your approved connections.</p>
                                </div>
                            </div> 
                            <div className="flex items-center gap-x-3">
                                  <input
                                      id="push-global"
                                      name="private"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      checked={sharePreference === 'private'}
                                      onChange={() => setSharePreference('private')}
                                    />                                <div className="text-sm leading-6">
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Keep Private</label>
                                    <p className="text-gray-500">Reserve access solely for yourself.</p>
                                </div>
                            </div>
                        </div>
                        </fieldset>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                </form>
            </FormProvider>
            )}
            <Separator className="my-4" />
       <Button onClick={handleCreateProfile} style={{ float: 'right', marginTop: '0em', marginRight: '2em' }}>Create</Button>
    </div>
  );
};

export default ProfileCreation;