"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from 'next/navigation';
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

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { Input } from "@/components/ui/input";
import { createProfileAction } from "../../../lib/actions/createProfile";
import { Separator } from "@/components/ui/separator";

import { ProfileAvatar } from "@/components/shared/ProfileAvatarProps";

import { Slider } from "@/components/ui/slider"

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

// Define your form schemas
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

interface Data {
  _id: string;
  // Add other properties as needed
}

export const ProfileCreation = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

  const [openSection, setOpenSection] = useState<string | null>(null);

  // State hooks to show sections
  const [showModelSelection, setShowModelSelection] = useState(false);
  const [showModelConfiguration, setShowModelConfiguration] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // State hooks to track completion of sections
  const [isModelSelectionComplete, setIsModelSelectionComplete] = useState(false);
  const [isModelConfigurationComplete, setIsModelConfigurationComplete] = useState(false);
  const [isVoiceComplete, setIsVoiceComplete] = useState(false);
  const [isExtensionsComplete, setIsExtensionsComplete] = useState(false);
  const [isProfileDetailsComplete, setIsProfileDetailsComplete] = useState(false);

  // State hooks to store form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [llm, setLLM] = useState("");
  const [personality, setPersonality] = useState("");
  const [identity, setIdentity] = useState("");
  const [interactionGuidelines, setInteractionGuidelines] = useState("");
  const [context, setContext] = useState("");
  const [temperature, setTemperature] = useState(33);
  const [voice, setVoice] = useState("");
  const [sharePreference, setSharePreference] = useState("");
  const [extensions, setExtensions] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);

  const [showExample, setShowExample] = useState(false);
    
      // Form hooks
  const nameForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  });

  const toggleSection = (sectionName: string) => {
    setOpenSection((current) => (current === sectionName ? null : sectionName));
  };

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to fully initialize

    if (!isSignedIn) {
      redirect('/sign-in'); // Use Next.js's redirect for client-side redirection
      return;
    }

    const fetchUserDetails = async () => {
      try {
        // Assuming you have a user ID to fetch additional details
        if (user) {
          const details = await getUserById(user.id);
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Optionally handle errors, like redirecting to an error page
      }
    };

    fetchUserDetails();
  }, [isSignedIn, isLoaded, user, reloadCounter]); 

  const handleReload = () => {
    setReloadCounter((prev) => prev + 1); // Function to trigger re-fetching
  };

  if (!userDetails) {
    return; // Placeholder while loading
  }

  const handleCreateProfile = async () => {
    try {
      let photoUrl = "";

      // Upload photo to S3 and get the URL
      if (photo) {
        const fileExtension = photo.name.split('.').pop();
        const fileName = `${name}.${fileExtension}`;
        const uploadParams = {
          Bucket: 'junoprofiles',
          Key: fileName,
          Body: photo,
          ContentType: photo.type,
        };

        const uploadResult = await s3.upload(uploadParams).promise();
        photoUrl = uploadResult.Location; // Get the URL of the uploaded file
      }

      const profileData: CreateProfileParams = {
        name,
        description,
        llm: llm || "GPT-3",
        personality,
        identity,
        interactionGuidelines,
        voice: voice || "Standard",
        extensions,
        sharePreference,
        photo: photoUrl, // Use the photoUrl obtained from S3
        context,
        temperature,
      };

      const results = await createProfileAction(profileData);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const handleLLMSelect = (selectedLLM: Data) => {
    setLLM(selectedLLM._id);
    setIsModelSelectionComplete(true);
  };

  const handleVoiceSelect = (selectedVoice: Data) => {
    setVoice(selectedVoice._id);
    setIsVoiceComplete(true);
  };

  const handleExtensionSelect = (selectedExtension: Data) => {
    setExtensions((prevExtensions) => [...prevExtensions, selectedExtension._id]);
    setIsExtensionsComplete(true);
  };


  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-10px' }}>
        Profile Creation
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Design your ideal AI from the ground up, tailoring every detail to your exact preferences.
      </p>
      <Separator className="my-4" />

       {/* AI Model Selection Section */}
       <div
        onClick={() => toggleSection('llmSelection')}
        style={{
          backgroundColor: openSection === 'llmSelection' ? '#f3f4f6' : (isModelSelectionComplete ? '#b3f0b3' : '#f3f4f6'), 
          cursor: 'pointer', 
          padding: '20px', 
          borderRadius: '0.375rem', // Equivalent to rounded-md
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Equivalent to shadow
          marginBottom: '1rem' // Equivalent to my-4
        }}
      >
        <h2 className="text-lg font-bold text-dark-600">AI Model Selection</h2>
      </div>
      {openSection === 'llmSelection' && (
        <LibraryPage
          contextType="Lab"
          libraryType="LLMs"
          h2Text=""
          pText="Select the language model that will power your AI's natural language understanding and generation."
          user={userDetails}
          onReload={handleReload}
          onSelect={handleLLMSelect}
        />
      )}

      {/* Language Model Configuration */}
      <div
        onClick={() => toggleSection('llmConfiguration')}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">AI Model Configuration</h2>
      </div>
      {openSection === 'llmConfiguration' && (
        <>
          <div className="forms-container space-y-8 mt-5">
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px', marginBottom: '-15px' }}>
              Fine-tune your selected LLM to align with your AI&apos;s intended behavior and identity.
            </p>
            
            <Separator className="my-2" />

            <div className="flex items-center space-x-2" style={{marginTop: '18px', marginBottom: '-22px', marginLeft: '800px' }}>
              <Switch
                id="airplane-mode"
                checked={showExample}
                onCheckedChange={setShowExample}
              />
              <Label htmlFor="airplane-mode">See Example</Label>
            </div>

            <FormProvider {...emailForm}>
              <form className="space-y-8" style={{marginTop: '10px', marginLeft: '5px' }}>
                <FormField
                  name="identity"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Core Identity
                      </FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        Define the core persona, character, or entity your AI will embody.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder={showExample ? "A highly experienced and caring physician named Dr. Emma Wilson" : ""}
                          value={identity}
                          onChange={(e) => setIdentity(e.target.value)}
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
                  name="context"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Context & Background
                      </FormLabel>                      
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        The initial prompts and information provided to set the scene and environment for the AI.                      
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder={showExample ? "You are a general practitioner at City Hospital. Your role is to diagnose and treat patients, provide advice on health and wellness, and demonstrate ethical and compassionate bedside manner." : ""}
                          value={context}
                          onChange={(e) => setContext(e.target.value)}
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
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Personality Traits
                      </FormLabel>
                      <FormDescription style={{ marginTop: '.1rem' }}>
                        Define the personality traits of your AI.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder={showExample ? "Calm, empathetic, excellent listener, able to explain complex medical concepts clearly, direct but caring, maintains boundaries." : ""}
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
              <form className="space-y-8" style={{marginLeft: '5px'}}>
                <FormField
                  name="interactionGuidelines"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Interaction Style
                      </FormLabel>
                      <FormDescription style={{ marginTop: '.1rem'}}>
                        Set guidelines on how your AI communicates with you
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder={showExample ? "Speak professionally but avoid overly complex medical jargon. Ask pertinent follow-up questions. Validate the patient's concerns. Provide explanations patiently." : ""}
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
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Output Controls
                      </FormLabel>
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
        onClick={() => toggleSection('voice')}
        style={{
          backgroundColor: openSection === 'voice' ? '#f3f4f6' : (isVoiceComplete ? '#b3f0b3' : '#f3f4f6'), 
          cursor: 'pointer', 
          padding: '20px', 
          borderRadius: '0.375rem', 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
          marginBottom: '1rem' 
        }}
      >
        <h2 className="text-lg font-bold text-dark-600">Voice Selection</h2>
      </div>
      {openSection === 'voice' && (
        <LibraryPage
          contextType="Lab"
          libraryType="Voices"
          h2Text=""
          pText="Choose a unique voice that complements your AI's personality and enhances the user experience."
          user={userDetails}
          onReload={handleReload}
          onSelect={handleVoiceSelect}
        />
      )}

      {/* Extensions Section */}
      <div
        onClick={() => toggleSection('extensions')}
        style={{
          backgroundColor: openSection === 'extensions' ? '#f3f4f6' : (isExtensionsComplete ? '#b3f0b3' : '#f3f4f6'), 
          cursor: 'pointer', 
          padding: '20px', 
          borderRadius: '0.375rem', 
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
          marginBottom: '1rem' 
        }}     
      >
        <h2 className="text-lg font-bold text-dark-600">Enhance Capabilites</h2>
      </div>
      {openSection === 'extensions' && (
        <LibraryPage
          contextType="Lab"
          libraryType="Extensions"
          h2Text=""
          pText="Enhance your AI's capabilities by adding powerful extensions and functionalities."
          user={userDetails}
          onReload={handleReload}
          onSelect={handleExtensionSelect}
        />
      )}

      {/* Profile Details Section */}
      <div
          onClick={() => toggleSection('profileDetails')}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">Profile Details</h2>
      </div>
      {openSection === 'profileDetails' && (
        <div className="forms-container space-y-8 mt-5" style={{marginLeft: '5px'}}>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px', marginBottom: '-14px'}}>
          The key information identifying and representing your profile.
        </p>
        <Separator className="my-4"/>
          <FormProvider {...nameForm}>
            <form className="mb-8 space-y-8"  style={{marginTop: '18px', marginLeft: '5px' }}>
            <FormField
              control={nameForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold" style={{ color: '#373737' }}>
                    Name
                  </FormLabel>
                  <FormDescription style={{ marginTop: '.1rem' }}>
                    The name of your profile.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Juno"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setName(e.target.value);
                      }}
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
                    <FormLabel className="font-bold" style={{ color: '#373737' }}>
                      Description
                    </FormLabel>
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
                  <FormLabel className="font-bold" style={{ color: '#373737' }}>
                    Share Preference
                  </FormLabel>
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