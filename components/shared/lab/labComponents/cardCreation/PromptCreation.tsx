import React, { useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ContextField,
  BackgroundField,
  PersonalityField,
  InteractionGuidelinesField,
  TemperatureField
} from '../../PromptCreationFields';

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

interface PromptCreationProps {
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  personality: string;
  setPersonality: React.Dispatch<React.SetStateAction<string>>;
  interactionGuidelines: string;
  setInteractionGuidelines: React.Dispatch<React.SetStateAction<string>>;
  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
}

const PromptCreation: React.FC<PromptCreationProps> = ({
  context,
  setContext,
  background,
  setBackground,
  personality,
  setPersonality,
  interactionGuidelines,
  setInteractionGuidelines,
  temperature,
  setTemperature,
}) => {
  const [showExample, setShowExample] = useState(false);
  const [uploadedFileContent, setUploadedFileContent] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadedFileContent(content);
    };
    reader.readAsText(file);
  };

  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
  });

  const examples = {
    context: "A highly experienced and caring physician named Dr. Emma Wilson",
    background: "You are a general practitioner at City Hospital. Your role is to diagnose and treat patients, provide advice on health and wellness, and demonstrate ethical and compassionate bedside manner.",
    personality: "Calm, empathetic, excellent listener, able to explain complex medical concepts clearly, direct but caring, maintains boundaries.",
    interactionGuidelines: "Speak professionally but avoid overly complex medical jargon. Ask pertinent follow-up questions. Validate the patient's concerns. Provide explanations patiently."
  };

  return (
    <div className="root-container">
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '-15px', marginLeft: '5px' }}>
        Create a prompt for your LLM to align with your AI's intended behavior and identity.
      </p>
      
      <Separator className="my-4" />

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
          <ContextField 
            value={context} 
            onChange={(value) => setContext(value as string)} 
            showExample={showExample} 
            exampleText={examples.context} 
          />
          <BackgroundField 
            value={background} 
            onChange={(value) => setBackground(value as string)} 
            showExample={showExample} 
            exampleText={examples.background} 
            onFileUpload={handleFileUpload}
          />
          <PersonalityField 
            value={personality} 
            onChange={(value) => setPersonality(value as string)} 
            showExample={showExample} 
            exampleText={examples.personality} 
          />
          <InteractionGuidelinesField 
            value={interactionGuidelines} 
            onChange={(value) => setInteractionGuidelines(value as string)} 
            showExample={showExample} 
            exampleText={examples.interactionGuidelines} 
          />
          <TemperatureField 
            value={temperature} 
            onChange={(value) => setTemperature(value as number)} 
            showExample={showExample} 
            exampleText="" 
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default PromptCreation;