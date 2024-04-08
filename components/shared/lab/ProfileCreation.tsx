"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from 'next/navigation';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";

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

  const [isLoading, setIsLoading] = useState(false);

  const [openSection, setOpenSection] = useState<string | null>(null);

  const [isCreated, setIsCreated] = useState(false);

  const { toast } = useToast();

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

  const [selections, setSelections] = useState({
    llm: null,
    voice: null,
    extensions: null,
  });

  const handleSelection = (category: keyof typeof selections, selectedItem: Data | null) => {
    setSelections(prev => ({
      ...prev,
      [category]: selectedItem ? selectedItem._id : null,  
    }));
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

  useEffect(() => {
    setIsModelConfigurationComplete(
      identity.trim() !== "" &&
      context.trim() !== "" &&
      personality.trim() !== "" &&
      interactionGuidelines.trim() !== ""&&
      temperature !== 33
    );
  }, [identity, context, personality, interactionGuidelines, temperature]);

  useEffect(() => {
    setIsProfileDetailsComplete(
      name.trim() !== "" &&
      description.trim() !== "" &&
      sharePreference !== ""
    );
  }, [name, description, photo, sharePreference]);

  const handleReload = () => {
    setReloadCounter((prev) => prev + 1); // Function to trigger re-fetching
  };

  if (!userDetails) {
    return; // Placeholder while loading
  }

  const handleCreateProfile = async () => {
    if (!user) {
      redirect('/sign-in');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true before making the API call
  
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
        llm,
        personality,
        identity,
        interactionGuidelines,
        voice,
        extensions,
        sharePreference,
        photo: photoUrl, 
        context,
        temperature,
        creator: userDetails.username,
      };
  
      await createProfileAction(profileData);
      setIsCreated(true); // Set isCreated to true after successful creation

      // close all sections 
      setOpenSection(null);
  
      // Show success toast message
      toast({
        title: `${name} has been created!`,
        description: (
          <span>
            See your created profile in your{' '}
            <a href="/myCollection" className="underline">
            collection
            </a>
          </span>
        )
      });
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false after the API call is completed
    }
  };

  const handleLLMSelect = (selectedLLM: Data | null) => {
    handleSelection('llm', selectedLLM);
    setIsModelSelectionComplete(true);
    setLLM(selectedLLM ? selectedLLM._id : '');
  };
  
  const handleVoiceSelect = (selectedVoice: Data | null) => {
    handleSelection('voice', selectedVoice);
    setIsVoiceComplete(true);
    setVoice(selectedVoice ? selectedVoice._id : '');
  };
  
  const handleExtensionSelect = (selectedExtension: Data | null) => {
    handleSelection('extensions', selectedExtension);
    setIsExtensionsComplete(true);
    if (selectedExtension) {
      setExtensions((prevExtensions) => [...prevExtensions, selectedExtension._id]);
    }
  };

  const isLlmSectionComplete = isModelSelectionComplete && selections.llm !== null;
  const isVoiceSectionComplete = isVoiceComplete && selections.voice !== null;
  const isExtensionsSectionComplete = isExtensionsComplete && selections.extensions !== null;
  const isProfileDetailsSectionComplete = isProfileDetailsComplete;
  const isLlmConfigurationSectionComplete = isModelConfigurationComplete;

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
          backgroundColor: '#f3f4f6',
          cursor: 'pointer',
          padding: '20px',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <h2 className="text-lg font-bold text-dark-600">AI Model Selection</h2>
        {isLlmSectionComplete && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                width: '95px',
                height: '95px',
              }}
            >
              <Image
                src="/assets/icons/checkMark.svg"
                alt="credit coins"
                layout="fill"
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
          )}
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
          selectedCardId={selections.llm}
        />
      )}

      {/* Language Model Configuration */}
      <div
        onClick={() => toggleSection('llmConfiguration')}
        style={{
          backgroundColor: '#f3f4f6',
          cursor: 'pointer',
          padding: '20px',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <h2 className="text-lg font-bold text-dark-600">AI Model Configuration</h2>
        {isLlmConfigurationSectionComplete && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
              width: '95px',
              height: '95px',
            }}
          >
            <Image
              src="/assets/icons/checkMark.svg"
              alt="credit coins"
              layout="fill"
              objectFit="contain"
              className="cursor-pointer"
            />
          </div>
        )}
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
          backgroundColor: '#f3f4f6',
          cursor: 'pointer',
          padding: '20px',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <h2 className="text-lg font-bold text-dark-600">Voice Selection</h2>
        {isVoiceSectionComplete && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                width: '95px',
                height: '95px',
              }}
            >
              <Image
                src="/assets/icons/checkMark.svg"
                alt="credit coins"
                layout="fill"
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
            )}
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
          selectedCardId={selections.voice}
        />
      )}

      {/* Extensions Section */}
      <div
        onClick={() => toggleSection('extensions')}
        style={{
          backgroundColor: '#f3f4f6',
          cursor: 'pointer',
          padding: '20px',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          marginBottom: '1rem',
          position: 'relative',
        }}     
      >
        <h2 className="text-lg font-bold text-dark-600">Enhance Capabilites</h2>
        {isExtensionsSectionComplete && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                width: '95px',
                height: '95px',
              }}
            >
              <Image
                src="/assets/icons/checkMark.svg"
                alt="credit coins"
                layout="fill"
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
            )}
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
          selectedCardId={selections.extensions}
        />
      )}

      {/* Profile Details Section */}
      <div
        onClick={() => toggleSection('profileDetails')}
        style={{
          backgroundColor: '#f3f4f6',
          cursor: 'pointer',
          padding: '20px',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <h2 className="text-lg font-bold text-dark-600">Profile Details</h2>
        {isProfileDetailsSectionComplete && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            width: '95px',
            height: '95px',
          }}
        >
          <Image
            src="/assets/icons/checkMark.svg"
            alt="credit coins"
            layout="fill"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
      )}
      </div>
      {openSection === 'profileDetails' && (
        <div className="forms-container space-y-8 mt-5" style={{marginLeft: '5px'}}>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px', marginBottom: '-14px'}}>
          The key information identifying and representing your profile.
        </p>
        <Separator className="my-4"/>
          <FormProvider {...nameForm}>
            <form className="mb-8 space-y-8" style={{marginTop: '18px', marginLeft: '5px' }}>
            <FormField
              control={nameForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold" style={{ color: '#373737' }}>
                    Name
                  </FormLabel>
                  <FormDescription style={{ marginTop: '.1rem'}}>
                    The name of your profile.
                  </FormDescription>
                  <FormControl >
                    <Input
                      placeholder=""
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
            <form className="mb-8 space-y-8" style={{marginTop: '18px', marginLeft: '5px' }}>
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
    <Button
      onClick={handleCreateProfile}
      style={{ float: 'right', marginTop: '0em', marginRight: '2em' }}
      disabled={isLoading || isCreated} // Disable the button while loading or after creation
    >
      {isLoading ? (
        <>
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </>
      ) : isCreated ? (
        'Created!'
      ) : (
        'Create'
      )}
    </Button>
    </div>
  );
};

export default ProfileCreation;