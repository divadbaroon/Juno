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
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-10px' }}>
        Voice Creation
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Quickly create unique voices by cloning from audio samples.
      </p>
      <Separator className="my-4" />

      <div>
        <h1>Coming soon...</h1>
      </div>
    </div>
  );
};

export default VoiceCreation;