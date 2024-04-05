import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DetailsSectionProps {
  models: string[];
  type: string;
  title: string;
  creator: string;
  description: string;
  link?: string;
  onUpdateDetails: (updatedDetails: { title: string; description: string }) => void;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ models, type, title, creator, description, link, onUpdateDetails}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showExampleUsage, setShowExampleUsage] = useState(false);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);

  // Form hooks
  const methods = useForm({
    defaultValues: { title, description },
  });

  const onSubmit = (data: { title: string; description: string }) => {
    onUpdateDetails(data);
  };

  return (
    <div>
      {/* Details section */}
      <div className="mb-4">
        <h3
          className="text-lg font-bold mb-2 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          Edit Details
        </h3>
        <Separator className="my-0" />
        {showDetails && (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="forms-container space-y-4 mt-2" style={{ marginLeft: '5px' }}>
              <div className="space-y-4" style={{ marginTop: '5px', marginLeft: '5px' }}>
                <FormField
                  control={methods.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {methods.formState.errors.title && <FormMessage>{methods.formState.errors.title.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4" style={{ marginLeft: '5px' }}>
                <FormField
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Description
                      </FormLabel>
                      <div className="mt-1">
                      <textarea
                          {...field}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" 
                        />
                      </div>
                      {methods.formState.errors.description && <FormMessage>{methods.formState.errors.description.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4" style={{ marginLeft: '5px' }}>
                <FormField
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" style={{ color: '#373737' }}>
                        Author
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={creator} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </FormProvider>
        )}
      </div>
      
      {/* Conditionally render sections based on type */}
      {type === 'Extensions' && (
        <>
          {/* Example Usage section */}
          <div className="mb-4">
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowExampleUsage(!showExampleUsage)}
            >
              Example Usage
            </h3>
            <Separator className="my-0" />
            {showExampleUsage && (
              <div className="border border-gray-300 rounded p-2">
                <p>Example usage content goes here.</p>
              </div>
            )}
          </div>

          {/* Setup Instructions section */}
          <div className="mb-4">
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowSetupInstructions(!showSetupInstructions)}
            >
              Setup Instructions
            </h3>
            <Separator className="my-0" />
            {showSetupInstructions && (
              <div className="border border-gray-300 rounded p-2">
                <p>There are not setup instructions for this extension.</p>
              </div>
            )}
          </div>

          {/* Code section */}
          <div className="mb-4">
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowCode(!showCode)}
            >
              Code
            </h3>
            <Separator className="my-0" />
            {showCode && (
              <div className="border border-gray-300 rounded p-2">
                <p>Code snippets or examples go here.</p>
              </div>
            )}
          </div>

          {/* Preferences section */}
          <div>
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
            >
              Preferences
            </h3>
            <Separator className="my-0" />
            {showAdditionalInfo && (
              <div className="border border-gray-300 rounded p-2">
                <p>Additional information goes here.</p>
              </div>
            )}
          </div>
        </>
      )}

      {type === 'LLMs' && (
        <>
          {/* Performance section */}
          <div className="mb-4">
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowMoreInformation(!showMoreInformation)}
            >
              More Information
            </h3>
            <Separator className="my-0" />
            {showMoreInformation && (
              <div className="border border-gray-300 rounded p-2">
                <p>More information can be found here: <a href={link} target="_blank" rel="noopener noreferrer" className="highlight-link">{link}</a></p>
              </div>
            )}
          </div>

        </>
      )}
    </div>
    
  );
};

export default DetailsSection;