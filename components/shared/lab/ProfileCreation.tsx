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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

// Define your form schemas
const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
});
const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export const ProfileCreation = () => {
  // State hooks
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [showLargeLanguageModel, setShowLargeLanguageModel] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showShare, setShowShare] = useState(false);

 // Form hooks
 const usernameForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });
  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  });

  // Define your onSubmit functions here
  const onSubmitUsername = usernameForm.handleSubmit((data) => {
    console.log('Username form data:', data);
    // Add your logic to handle username form submission
  });

  const onSubmitEmail = emailForm.handleSubmit((data) => {
    console.log('Email form data:', data);
    // Add your logic to handle email form submission
  });

  // Component return
  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-25px' }}>Profile Creation</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Craft your perfect AI companion from the ground up, tailoring every detail to your preferences.
      </p>
      <Separator className="my-4" />

      <div onClick={() => setShowProfileCreation(!showProfileCreation)}
           className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Basic Details</h2>
        
      </div>
      {showProfileCreation && (
      <div className="forms-container space-y-8 mt-5"> {/* Updated container for vertical layout */}
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Lay the foundation for your AI by providing essential information that defines its identity and purpose.
        </p>
        <FormProvider {...usernameForm}>
          <form className="space-y-8">
            <FormField
              control={usernameForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Name</FormLabel>
                  <FormDescription style={{ marginTop: '.2rem' }}>
                    The name of your AI.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Juno" {...field} />
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
                  <FormLabel className="font-bold">Personality</FormLabel>
                  <FormDescription style={{ marginTop: '.2rem' }}>             
                    Define the personality traits of your AI.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Friendly" {...field} />
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
                    <Input placeholder="Assistant" {...field} />
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
                    <Input placeholder="Barack Obama" {...field} />
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
                <FormLabel className="font-bold">Restrictions</FormLabel>
                <FormDescription style={{ marginTop: '.2rem' }}>             
                  Sets restrictions on how your AI communicates with you
                </FormDescription>
                <FormControl>
                  <Input placeholder="Only respond in a poetic fashion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
        </div>
      )}

      <div onClick={() => setShowLargeLanguageModel(!showLargeLanguageModel)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Large-Language Model</h2>
      </div>
      {showLargeLanguageModel && <LibraryPage 
                h2Text="" 
                pText="Select the Large-Language Model (LLM) that will power your AI's natural language understanding and generation capabilities."
                libraryType="LLM"
      />}
      
      {/* Voice Section */}
      <div onClick={() => setShowVoice(!showVoice)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Voice</h2>
      </div>
      {showVoice && <LibraryPage 
                h2Text="" 
                pText="Give your AI a unique voice that complements its personality and enhances the user experience."
                libraryType="Voice"
      />}
    
      {/* Extensions Section */}
      <div onClick={() => setShowExtensions(!showExtensions)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Extensions</h2>
      </div>
      {showExtensions && <LibraryPage 
        h2Text="" 
        pText="Enhance the capabilities of your AI by adding extensions that provide additional features and functionalities."
        libraryType="Extension"
      />}

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
                                    <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Share Globally</label>
                                        <p className="text-gray-500">Allow anyone to access your newly created voice.</p>
                                    </div>
                                </div>
                            <div className="flex items-center gap-x-3">
                                <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                <div className="text-sm leading-6">
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Only With Friends</label>
                                    <p className="text-gray-500">Allow only friends access your newly created voice.</p>
                                </div>
                            </div> 
                            <div className="flex items-center gap-x-3">
                                <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                <div className="text-sm leading-6">
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Keep Private</label>
                                    <p className="text-gray-500">Only you will be able to access your newly created voice.</p>
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
      <Button style={{ float: 'right', marginTop: '1em', marginRight: '2em' }}>Create</Button>
    </div>
  );
};

export default ProfileCreation;