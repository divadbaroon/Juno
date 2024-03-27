"use client";
import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LibraryPage } from "@/components/shared/library/LibraryPage";
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
import { Separator } from "@/components/ui/separator";

import { ProfileAvatar } from "@/components/shared/ProfileAvatarProps";

import { Slider } from "@/components/ui/slider"

// Define your form schemas
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export const ProfileCreation = () => {
  // State hooks to show sections
  const [showModelSelection, setShowModelSelection] = useState(false);
  const [showModelConfiguration, setShowModelConfiguration] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // State hooks to store form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [llm, setLLM] = useState("");
  const [personality, setPersonality] = useState("");
  const [role, setRole] = useState("");
  const [persona, setPersona] = useState("");
  const [interactionGuidelines, setInteractionGuidelines] = useState("");
  const [seed, setSeed] = useState(""); // Added state for seed
  const [temperature, setTemperature] = useState(33); // Added state for temperature
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
      seed,
      temperature,
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
  const nameForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  });

  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-30px' }}>
        Profile Creation
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Design your ideal AI from the ground up, tailoring every detail to your exact preferences.
      </p>
      <Separator className="my-4" />

       {/* AI Model Selection Section */}
       <div
        onClick={() => setShowModelSelection(!showModelSelection)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">AI Model Selection</h2>
      </div>
      {showModelSelection && (
        <LibraryPage
          contextType="Lab"
          libraryType="LLMs"
          h2Text=""
          pText="Select the language model that will power your AI's natural language understanding and generation."
        />
      )}

      {/* Language Model Section */}
      <div
        onClick={() => setShowModelConfiguration(!showModelConfiguration)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">AI Model Configuration</h2>
      </div>
      {showModelConfiguration && (
        <>
          <div className="forms-container space-y-8 mt-5">
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px', marginBottom: '-15px' }}>
              Fine-tune your selected LLM to align with your AI&apos;s intended behavior and identity.
            </p>
            <Separator className="my-2" />

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginLeft: '5px', marginTop: '20px' }}>
                <FormField
                  name="seed"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold">Seed</FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        Initial text setting the context and direction for the LLM&apos;s responses.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="I am a creative writing assistant here to help you with storytelling and worldbuilding."
                          value={seed}
                          onChange={(e) => setSeed(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginLeft: '5px', marginTop: '20px' }}>
                <FormField
                  name="personality"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold">Personality</FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        Define the personality traits of your AI.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Imaginative, encouraging, patient"
                          value={personality}
                          onChange={(e) => setPersonality(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginLeft: '5px' }}>
                <FormField
                  name="role"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold">Role</FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        Function or job of the AI within interactions
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Writing companion and creative collaborator"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginLeft: '5px' }}>
                <FormField
                  name="persona"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold">Persona</FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        The archetype or character the AI will embody.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="A supportive mentor guiding you through the writing process"
                          value={persona}
                          onChange={(e) => setPersona(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginLeft: '5px'}}>
                <FormField
                  name="interactionGuidelines"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold">Interaction Guidelines</FormLabel>
                      <FormDescription style={{ marginTop: '.1rem'}}>
                        Set guidelines on how your AI communicates with you
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Provide constructive feedback, ask thought-provoking questions, and offer creative suggestions."
                          value={interactionGuidelines}
                          onChange={(e) => setInteractionGuidelines(e.target.value)}
                          style={{marginBottom: '1.5rem' }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginLeft: '5px', marginBottom: '35px'  }}>
                <FormField
                  name="temperature"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold">Temperature</FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        Control the level of creativity and randomness of the LLM&apos;s outputs, balancing novelty and consistency.
                      </FormDescription>
                      <FormControl>
                        <Slider
                          defaultValue={[temperature]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setTemperature(value[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </div>
        </>
      )}

      {/* Voice Section */}
      <div
        onClick={() => setShowVoice(!showVoice)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">Voice Selection</h2>
      </div>
      {showVoice && (
        <LibraryPage
          contextType="Lab"
          libraryType="Voices"
          h2Text=""
          pText="Choose a unique voice that complements your AI's personality and enhances the user experience."
        />
      )}

      {/* Extensions Section */}
      <div
        onClick={() => setShowExtensions(!showExtensions)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">Enhance Capabilites</h2>
      </div>
      {showExtensions && (
        <LibraryPage
          contextType="Lab"
          libraryType="Extensions"
          h2Text=""
          pText="Enhance your AI's capabilities by adding powerful extensions and functionalities."
        />
      )}

      {/* Profile Details Section */}
      <div
        onClick={() => setShowProfileDetails(!showProfileDetails)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">Profile Details</h2>
      </div>
      {showProfileDetails && (
        <div className="forms-container space-y-8 mt-5" style={{marginLeft: '5px'}}>
          <FormProvider {...nameForm}>
            <form className="mb-8 space-y-8">
              <FormField
                control={nameForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormDescription style={{ marginTop: '.1rem' }}>
                      The name of your profile.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Juno"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>

          <FormProvider {...emailForm}>
            <form className="mb-8 space-y-8">
              <FormField
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel className="font-bold">Description</FormLabel>
                    <FormDescription style={{ marginTop: '.1rem' }}>
                      Describe your profile.
                    </FormDescription>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>

          <FormProvider {...emailForm}>
            <form className="mb-8 space-y-8">
              <FormField
                name="photo"
                render={() => (
                  <FormItem>
                    <ProfileAvatar photo={photo} onPhotoChange={setPhoto} />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>

          
        <FormProvider {...emailForm}>
          <form className="mb-8 space-y-8">
            <FormField
              name="sharePreference"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold">Share Preference</FormLabel>
                  <FormDescription style={{ marginTop: '5px' }}>
                    Determine the level of access and visibility for your newly created AI profile.
                  </FormDescription>
                  <fieldset>
                    <div className="mt-3 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-global"
                          name="sharePreference"
                          type="radio"
                          value="global"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={sharePreference === 'global'}
                          onChange={() => setSharePreference('global')}
                        />
                        <div className="text-sm leading-6">
                          <label htmlFor="push-global" className="block text-sm font-medium leading-6 text-gray-900">
                            Share Globally
                          </label>
                          <p className="text-gray-500">Allow anyone to discover and interact with your profile.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-friends"
                          name="sharePreference"
                          type="radio"
                          value="friends"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={sharePreference === 'friends'}
                          onChange={() => setSharePreference('friends')}
                        />
                        <div className="text-sm leading-6">
                          <label htmlFor="push-friends" className="block text-sm font-medium leading-6 text-gray-900">
                            Share With Friends
                          </label>
                          <p className="text-gray-500">Grant access exclusively to your approved connections.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-private"
                          name="sharePreference"
                          type="radio"
                          value="private"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={sharePreference === 'private'}
                          onChange={() => setSharePreference('private')}
                        />
                        <div className="text-sm leading-6">
                          <label htmlFor="push-private" className="block text-sm font-medium leading-6 text-gray-900">
                            Keep Private
                          </label>
                          <p className="text-gray-500">Reserve access solely for yourself.</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </FormItem>
              )}
            />
          </form>
        </FormProvider>
      </div>
    )}

    <Separator className="my-4" />
    <Button onClick={handleCreateProfile} style={{ float: 'right', marginTop: '0em', marginRight: '2em' }}>
      Create
    </Button>
    </div>
  );
};

export default ProfileCreation;