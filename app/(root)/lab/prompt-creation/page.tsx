"use client";
import React, { useState, useEffect } from 'react';
import PromptCreation from "@/components/shared/lab/labComponents/cardCreation/PromptCreation";
import LabHeader from '@/components/shared/lab/LabHeader'
import TabNavigation from '@/components/shared/lab/LabTabNavigation'
import { Separator } from "@/components/ui/separator";
import SectionHeader from '@/components/shared/lab/sectionHeader'
import CardDetails from '@/components/shared/lab/labComponents/cardDetails';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { redirect } from 'next/navigation';
import { getUserById } from "@/lib/actions/user.actions";
import { useUser } from '@clerk/clerk-react';

import { handleCreatePrompt } from '@/components/shared/lab/labComponents/handlers/promptCreationHandler';

export default function ProfileCreationPage() {
  const [userDetails, setUserDetails] = useState<User| null>(null);
  const { user, isSignedIn, isLoaded } = useUser();
  const [reloadCounter, setReloadCounter] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sharePreference, setSharePreference] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [personality, setPersonality] = useState("");
  const [context, setContext] = useState("");
  const [interactionGuidelines, setInteractionGuidelines] = useState("");
  const [background, setBackground] = useState("");
  const [temperature, setTemperature] = useState(33);
  const [tags, setTags] = useState<string[]>([]);

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      redirect('/sign-in');
      return;
    }
    const fetchUserDetails = async () => {
      try {
        if (user) {
          const details = await getUserById(user.id);
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, [isSignedIn, isLoaded, user, reloadCounter]);


  const toggleSection = (sectionName: string) => {
    setOpenSection((current) => (current === sectionName ? null : sectionName));
  };

  return (
    <div className="root-container">
      <LabHeader/>

      <Separator className="my-4" />
      <TabNavigation />
      <Separator className="my-4" />

      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>
        Prompt Creation
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Create a prompt for your LLM to align with your AI&apos;s intended behavior and identity.
      </p>

      <Separator className="my-4" />

      <SectionHeader
        sectionName="promptCreation"
        title="Prompt Creation"
        isComplete={Boolean(context && background && personality && interactionGuidelines && temperature !== 33)}
        onClick={toggleSection}
      />
      {openSection === 'promptCreation' && (
      <PromptCreation
          context={context}
          setContext={setContext}
          background={background}
          setBackground={setBackground}
          personality={personality}
          setPersonality={setPersonality}
          interactionGuidelines={interactionGuidelines}
          setInteractionGuidelines={setInteractionGuidelines}
          temperature={temperature}
          setTemperature={setTemperature}
        />
      )}

      <SectionHeader
          sectionName="profileDetails"
          title="Prompt Details"
          isComplete={!!(name && description && sharePreference)}
          onClick={toggleSection}
        />
        {openSection === 'profileDetails' && (
          <CardDetails
            contextType={"Lab"}
            cardType={"Prompts"}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            photo={photo}
            setPhoto={setPhoto}
            sharePreference={sharePreference}
            setSharePreference={setSharePreference}
            tags={tags}  
            setTags={setTags}  
          />
        )}

        <Separator className="my-4" />

        <Button
          onClick={async () => {
            setIsLoading(true);
            try {
              const promptData = {
                name,
                description,
                personality,
                context,
                interactionGuidelines,
                sharePreference,
                background,
                temperature,
                creator: userDetails?.username || 'Unknown',
                objectURL: '',
                tags,
                index: 100
              };
              
              await handleCreatePrompt({
                promptData,
                photo,
                setIsLoading,
                setIsCreated,
                setOpenSection,
                toast
              });
            } catch (error) {
              console.error("Error creating prompt:", error);
              toast({
                title: "Error",
                description: "Failed to create prompt. Please try again.",
                variant: "destructive"
              });
            } finally {
              setIsLoading(false);
            }
          }}
          style={{ float: 'right', marginTop: '0em', marginRight: '2em' }}
          disabled={isLoading || isCreated}
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