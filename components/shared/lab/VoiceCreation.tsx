"use client";
import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// Define your form schemas
const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export const VoiceCreation = () => {
  const [showTrainingData, setShowTrainingData] = useState(false);
  const [showVoiceDetails, setShowVoiceDetails] = useState(false);

  // Form hooks
  const usernameForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  });

  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-25px' }}>
        Voice Creation
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
      Harness the Voice Creation suite to clone any voice, giving your AI a unique vocal identity complementing its personality.
      </p>
      <Separator className="my-4" />

      {/* Training Data Section */}
      <div
        onClick={() => setShowTrainingData(!showTrainingData)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">Voice Sample</h2>
      </div>
      {showTrainingData && (
        <div className="forms-container space-y-8 mt-5">
          <FormProvider {...usernameForm}>
            <form className="mb-8 space-y-8">
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold" style={{marginLeft: '5px' }}>Voice Audio Sample</FormLabel>
                    <FormDescription style={{ marginTop: '.2rem', marginLeft: '5px' }}>
                      Upload a high-quality audio sample of your desired voice. A five-minute sample is sufficient. Ensure the audio is clear and free of background noise for optimal results.
                    </FormDescription>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" style={{marginLeft: '5px' }}>
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">wav, mp3, mp4 up to 10MB</p>
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

      {/* Voice Details Section */}
      <div
        onClick={() => setShowVoiceDetails(!showVoiceDetails)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">Voice Details</h2>
      </div>
      {showVoiceDetails && (
        <div className="forms-container space-y-8 mt-5">
          <FormProvider {...usernameForm}>
            <form className="mb-8 space-y-8">
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold" style={{marginLeft: '5px' }}>Name</FormLabel>
                    <FormDescription style={{ marginTop: '.2rem', marginLeft: '5px'  }}>
                      The name of your voice.
                    </FormDescription>
                    <FormControl style={{marginLeft: '5px' }}>
                      <Input placeholder="Juno" {...field} />
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
                    <FormLabel className="font-bold" style={{marginLeft: '5px' }}>Description</FormLabel>
                    <FormDescription style={{ marginTop: '.2rem', marginLeft: '5px'  }}>
                      Describe your voice.
                    </FormDescription >
                    <div className="mt-2" style={{marginLeft: '5px' }}>
                      <textarea id="about" name="about" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
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
                    <FormLabel className="font-bold" style={{marginLeft: '5px' }}>Profile photo</FormLabel>
                    <FormDescription style={{ marginTop: '.2rem', marginLeft: '5px'  }}>
                      Upload a profile photo to represent your voice.
                    </FormDescription>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" style={{marginLeft: '5px' }}>
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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

          {/* Share Preference */}
          <FormProvider {...usernameForm}>
            <form className="mb-8 space-y-8">
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold" style={{marginLeft: '5px' }}>Share Preference</FormLabel>
                    <FormDescription style={{ marginTop: '.2rem', marginLeft: '5px'  }}>
                      Control the visibility and accessibility of your newly created voice.
                    </FormDescription>
                    <fieldset>
                      <div className="mt-3 space-y-6">
                        <div className="flex items-center gap-x-3" style={{marginLeft: '5px' }}>
                          <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <div className="text-sm leading-6">
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Share Globally</label>
                            <p className="text-gray-500">Allow anyone to discover and use your voice.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-3" style={{marginLeft: '5px' }}>
                          <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <div className="text-sm leading-6">
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">Share With Friends</label>
                            <p className="text-gray-500">Grant access exclusively to your approved connections.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-3" style={{marginLeft: '5px' }}>
                          <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <div className="text-sm leading-6">
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
        </div>
      )}

      <Separator className="my-4" />
      <Button style={{ float: 'right', marginTop: '0em', marginRight: '2em' }}>Create</Button>
    </div>
  );
};

export default VoiceCreation;