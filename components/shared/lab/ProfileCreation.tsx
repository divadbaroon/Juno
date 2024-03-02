"use client";
import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
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
        Customize and create your AI profile using the forms below. After creation your profile will automatically sync with the Juno Chrome Extension, allowing you to instantly interact.
      </p>
      <Separator className="my-4" />

      <div onClick={() => setShowProfileCreation(!showProfileCreation)}
           className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Basic Details</h2>
      </div>
      {showProfileCreation && (
      <div className="forms-container space-y-8 mt-5"> {/* Updated container for vertical layout */}
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
                  <FormLabel className="font-bold">Persona</FormLabel>
                  <FormDescription style={{ marginTop: '.2rem' }}>
                    The role or archetype your AI embodies.
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
        </div>
        )}

      <div onClick={() => setShowLargeLanguageModel(!showLargeLanguageModel)}
          className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
        <h2 className="text-lg font-bold text-dark-600">Large Language Model</h2>
      </div>
      {showLargeLanguageModel && (
        <div>
          <div className="card-container flex flex-wrap gap-4 mt-8"> {/* Updated Flex container for cards */}
            <Card>
              <CardHeader>
                <CardTitle>GPT-4.5-Turbo</CardTitle>
                <CardDescription>OpenAI</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Most advanced GPT model.</p>
              </CardContent>
              <CardFooter>
                <Button>Select</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GPT-4</CardTitle>
                <CardDescription>OpenAI</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Highly versatile and comprehensive.</p>
              </CardContent>
              <CardFooter>
                <Button>Select</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GPT-3.5-Turbo</CardTitle>
                <CardDescription>OpenAI</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Optimized performance and efficiency.</p>
              </CardContent>
              <CardFooter>
                <Button>Select</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>mistral</CardTitle>
                <CardDescription>Mistral AI</CardDescription>
              </CardHeader>
              <CardContent>
                <p>7B param language model</p>
              </CardContent>
              <CardFooter>
                <Button>Select</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>llama2</CardTitle>
                <CardDescription>Meta</CardDescription>
              </CardHeader>
              <CardContent>
                <p>70B param language model</p>
              </CardContent>
              <CardFooter>
                <Button>Select</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>gemma</CardTitle>
                <CardDescription>Google DeepMind</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Lightweight open source model</p>
              </CardContent>
              <CardFooter>
                <Button>Select</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}


      {/* Voice Section */}
<div onClick={() => setShowVoice(!showVoice)}
     className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
  <h2 className="text-lg font-bold text-dark-600">Voice</h2>
</div>
{showVoice && (
  <div>
    <p className="p-4 text-dark-400 mt-2">
      Select the voice for your AI. To browse through more voices, visit the Library. To create your own, visit the Lab.
    </p>
    <Separator className="my-4" />
    <div className="card-container flex flex-wrap gap-4 mt-8">
      {/* List of Voice Cards */}
      {/* Repeat this structure for each voice card */}
      <Card>
          <CardHeader>
            <CardTitle>Barack Obama</CardTitle>
            <CardDescription>Elevenlabs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Most advanced GPT model.</p>
          </CardContent>
          <CardFooter>
          <Button>Sample</Button>
          <Button>Select</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>David Attenborough</CardTitle>
            <CardDescription>Elevenlabs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Highly versatile and comprehensive.</p>
          </CardContent>
          <CardFooter>
          <Button>Sample</Button>
          <Button>Select</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Morgan Freeman</CardTitle>
            <CardDescription>Elevenlabs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Optimized performance and efficiency.</p>
          </CardContent>
          <CardFooter>
          <Button>Sample</Button>
          <Button>Select</Button>
          </CardFooter>
        </Card>
      

        {/* Add more Card components as needed */}
      </div>
      <div className="card-container flex space-x-4 mt-8"> {/* Flex container for cards */}
        <Card>
          <CardHeader>
            <CardTitle>Alloy</CardTitle>
            <CardDescription>OpenAI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Opensourced 7B param model</p>
          </CardContent>
          <CardFooter>
          <Button>Sample</Button>
          <Button>Select</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Echo</CardTitle>
            <CardDescription>OpenAI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>70B param language model</p>
          </CardContent>
          <CardFooter>
          <Button>Sample</Button>
          <Button>Select</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fable</CardTitle>
            <CardDescription>OpenAI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Lightweight open source model</p>
          </CardContent>
          <CardFooter>
          <Button>Sample</Button>
          <Button>Select</Button>
          </CardFooter>
        </Card>
      {/* Add more voice cards as needed */}
        </div>
      </div>
    )}
    {/* Extensions Section */}
<div onClick={() => setShowExtensions(!showExtensions)}
     className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
  <h2 className="text-lg font-bold text-dark-600">Extensions</h2>
</div>
{showExtensions && (
  <div>
    <p className="p-4 text-dark-400 mt-2">
      Extend the capabilities of your AI by adding extensions. To browse through more extensions, visit the Library. To create your own, visit the Lab.
    </p>
    <Separator className="my-4" />
    <div className="card-container flex flex-wrap gap-4 mt-8">
      {/* List of Extension Cards */}
      {/* Repeat this structure for each extension card */}
      <Card>
          <CardHeader>
            <CardTitle>Page Reader</CardTitle>
            <CardDescription>Creator: divadbaroon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Highlight text and interact with Juno to instantly have it included as context</p>
          </CardContent>
          <CardFooter>
            <Button>More Info</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Reader</CardTitle>
            <CardDescription>Creator: divadbaroon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Streamline reading by having webpages and documents read and analyzed for quick summaries or in-depth info.</p>
          </CardContent>
          <CardFooter>
            <Button>More Info</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webbrowser</CardTitle>
            <CardDescription>Creator: divadbaroon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Navigate the web with voice-activated commands for a smoother browsing experience</p>
          </CardContent>
          <CardFooter>
            <Button>More Info</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>
      

        {/* Add more Card components as needed */}
      </div>
      <div className="card-container flex space-x-4 mt-8"> {/* Flex container for cards */}
        <Card>
          <CardHeader>
            <CardTitle>Spotify</CardTitle>
            <CardDescription>Creator: divadbaroon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Control Spotify with voice commands, making your music experience hands-free.</p>
          </CardContent>
          <CardFooter>
            <Button>More Info</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Calendar</CardTitle>
            <CardDescription>Creator: divadbaroon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Effortlessly handle schedules and appointments with Google Calendar integration.</p>
          </CardContent>
          <CardFooter>
            <Button>More Info</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Youtube</CardTitle>
            <CardDescription>Creator: divadbaroon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Effortlessly handle schedules and appointments with Google Calendar integration.</p>
          </CardContent>
          <CardFooter>
            <Button>More Info</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>
        </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCreation;