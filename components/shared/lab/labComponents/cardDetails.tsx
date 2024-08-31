import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ProfileAvatar } from "@/components/shared/ProfileAvatarProps";
import Filter from '@/components/shared/filter'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string(),
  sharePreference: z.enum(['global', 'friends', 'private']),
});

interface CardDetailsProps {
  contextType: string;
  cardType: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  photo: File | null;
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  sharePreference: string;
  setSharePreference: React.Dispatch<React.SetStateAction<string>>;
  tags: string[]; 
  setTags: React.Dispatch<React.SetStateAction<string[]>>;  
}

const CardDetails: React.FC<CardDetailsProps> = ({
  contextType,
  cardType,
  name,
  setName,
  description,
  setDescription,
  photo,
  setPhoto,
  sharePreference,
  setSharePreference,
  tags,
  setTags
}) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [fieldAvatar, setFieldAvatar] = useState("");
  const [fieldSharePreference, setFieldSharePreference] = useState("");
  const [fieldSharePreferenceGlobal, setFieldSharePreferenceGlobal] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      description: description,
      sharePreference: sharePreference,
    },
  });

  // Dynamically generate the descriptions for the fields depending the type of creation
  useEffect(() => {
    if (cardType === "Profiles") {
      setFieldName("The name of your profile.");
      setFieldDescription("Describe your profile.");
      setFieldAvatar("Upload a photo to represent your profile.");
      setFieldSharePreference("Determine the level of access and visibility for your newly created profile.");
      setFieldSharePreferenceGlobal("Allow anyone to discover and interact with your profile.")
    } else if (cardType === "Prompts") {
      setFieldName("The name of your prompt.");
      setFieldDescription("Describe your prompt.");
      setFieldAvatar("Upload a photo to represent your prompt.");
      setFieldSharePreference("Determine the level of access and visibility for your newly created prompt.");
      setFieldSharePreferenceGlobal("Allow anyone to discover and interact with your prompt.")
    }
  }, [cardType]);

  return (
    <FormProvider {...form}>
      <div className="forms-container space-y-8 mt-5" style={{marginLeft: '5px'}}>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px', marginBottom: '-14px'}}>
          The key information identifying and representing your {cardType}.
        </p>
        <Separator className="my-4"/>
        
        <form className="space-y-8" style={{marginTop: '18px', marginLeft: '5px' }}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold" style={{ color: '#373737' }}>Name</FormLabel>
                <FormDescription style={{ marginTop: '.1rem'}}>{fieldName}</FormDescription>
                <FormControl>
                  <Input
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold" style={{ color: '#373737' }}>Description</FormLabel>
                <FormDescription style={{ marginTop: '.1rem' }}>{fieldDescription}</FormDescription>
                <FormControl>
                  <textarea
                    {...field}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      field.onChange(e);
                      setDescription(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="photo"
            render={() => (
              <FormItem>
                <ProfileAvatar photo={photo} onPhotoChange={setPhoto} fieldDescription={fieldAvatar} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sharePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold" style={{ color: '#373737' }}>Share Preference</FormLabel>
                <FormDescription style={{ marginTop: '5px' }}>{fieldSharePreference}</FormDescription>
                <FormControl>
                  <fieldset>
                    <div className="mt-3 space-y-6">
                      {['global', 'friends', 'private'].map((value) => (
                        <div key={value} className="flex items-center gap-x-3">
                          <input
                            id={`push-${value}`}
                            type="radio"
                            value={value}
                            checked={field.value === value}
                            onChange={() => {
                              field.onChange(value);
                              setSharePreference(value);
                            }}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="text-sm leading-6">
                            <label htmlFor={`push-${value}`} className="block text-sm font-medium leading-6 text-gray-900">
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </label>
                            <p className="text-gray-500">
                              {value === 'global' ? fieldSharePreferenceGlobal :
                               value === 'friends' ? "Grant access exclusively to your approved connections." :
                               "Reserve access solely for yourself."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel className="font-bold" style={{ color: '#373737' }}>Tags</FormLabel>
                <FormDescription style={{ marginTop: '.1rem' }}>
                  Add tags to help users find your {cardType}.
                </FormDescription>
                <FormControl>
                  <div className="mt-2">
                    <Filter 
                    contextType={contextType} cardType={cardType}
                    onTagsChange={setTags}
                    initialTags={tags} 
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </div>
    </FormProvider>
  );
};

export default CardDetails;