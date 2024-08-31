"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { LibraryPage } from "@/components/shared/library/LibraryPage";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

interface Data {
  _id: string;
}

const QuickStart = () => {
  const [openStep, setOpenStep] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Process URL parameters
    const filters: {[key: string]: string} = {};
    searchParams.forEach((value, key) => {
        filters[key] = value;
    });
    
    setActiveFilters(filters);

}, [searchParams]);

  const [selections, setSelections] = useState({
    profile: null,
    llm: null,
    voice: null,
    extensions: null,
    installExtension: false,
    setupHotkeys: false,
    startInteracting: false,
  });

  // State hooks to store form data
  const [profile, setProfile] = useState("");
  const [llm, setLLM] = useState("");
  const [voice, setVoice] = useState("");
  const [extensions, setExtensions] = useState<string[]>([]);

  // State hooks to track completion of sections
  const [isProfileSelectionComplete, setIsProfileSelectionComplete] = useState(false);
  const [isVoiceSelectionComplete, setIsVoiceSelectionComplete] = useState(false);
  const [isLLMSelectionComplete, setIsLLMSelectionComplete] = useState(false);
  const [isExtensionsSelectionComplete, setIsExtensionsSelectionComplete] = useState(false);

  const handleProfileSelection = (selectedLLM: Data) => {
    setLLM(selectedLLM._id);
    setIsProfileSelectionComplete(true);
  };

  const handleVoiceSelection = (selectedVoice: Data) => {
    setVoice(selectedVoice._id);
    setIsVoiceSelectionComplete(true);
  };

  const handleLLMSelection = (selectedExtension: Data) => {
    setExtensions((prevExtensions) => [...prevExtensions, selectedExtension._id]);
    setIsLLMSelectionComplete(true);
  };

  const handleExtensionSelection = (selectedExtension: Data) => {
    setExtensions((prevExtensions) => [...prevExtensions, selectedExtension._id]);
    setIsExtensionsSelectionComplete(true);
  };

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


  const handleReload = () => {
    setReloadCounter((prev) => prev + 1);
  };

  if (!userDetails) {
    return; 
  }

  const handleSelection = (category: keyof typeof selections, selectedItem: Data) => {
    if (category === 'profile' || category === 'llm' || category === 'voice' || category === 'extensions') {
      setSelections(prev => ({
        ...prev,
        [category]: selectedItem ? selectedItem._id : null,  
      }));
  
      // Mark the step as complete based on the category
      if (category === 'profile') setIsProfileSelectionComplete(true);
      if (category === 'voice') setIsVoiceSelectionComplete(true);
      if (category === 'llm') setIsLLMSelectionComplete(true);
      if (category === 'extensions') setIsExtensionsSelectionComplete(true);
    }
  };

  const isLlmSectionComplete = isLLMSelectionComplete && selections.llm !== null;
  const isVoiceSectionComplete = isVoiceSelectionComplete && selections.voice !== null;
  const isExtensionsSectionComplete = isExtensionsSelectionComplete && selections.extensions !== null;

  const renderSection = (title: string, description: string, steps: ReactNode) => (
    <div className="section">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>{title}</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginBottom: '15px' }}>{description}</p>
      {steps}
      <Separator className="my-4" />
    </div>
  );

  const renderStep = (title: string, stepKey: keyof typeof selections, content: ReactNode) => {
    const isStepComplete = {
      profile: isProfileSelectionComplete,
      voice: isVoiceSectionComplete,
      llm: isLlmSectionComplete,
      extensions: isExtensionsSectionComplete,
      installExtension: false,
      setupHotkeys: false,
      startInteracting: false,
    }[stepKey];

    return (
      <>
        <div
          onClick={() => setOpenStep(openStep === stepKey ? null : stepKey)}
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
          <h2 className="text-lg font-bold text-dark-600">{title}</h2>
          {isStepComplete && (
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
        {openStep === stepKey && React.cloneElement(content as React.ReactElement<any>, {
          onSelect: (selectedItem: Data) => handleSelection(stepKey, selectedItem),
          selectedCardId: selections[stepKey],
        })}
      </>
    );
  };

  return (
    <div className="root-container">
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '10px' }}>
            Quick Start
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px', marginLeft: '3px' }}>
          Browse, Select, and Interact with AI in less than 60 seconds   
          </p>
        </div>
        <Separator className="my-4" />
      </div>

      {renderSection(
        "Get Started",
        "Find and select a profile that matches your interests and needs.",
        <>
          {renderStep("Select a Profile", "profile",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Profiles"
              h2Text=""
              pText="Profiles are pre-configured AIs designed to provide unique capabilities. Each profile combines a large language model with tailored instructions, a distinctive voice, and specific functionalities to suit your needs."
              user={userDetails}
              onReload={handleReload}
              activeFilters={activeFilters}
            />
          )}
        </>
      )}

      {renderSection(
        "Integrate",
        "Install the Juno Browser Extension for effortless AI interaction within your browser.",
        <>
          {renderStep("Install the Juno Browser Extension", "installExtension",
            <div style={{ marginTop: '15px' }}>
              <h1>Coming soon...</h1>
            </div>
          )}
        </>
      )}

      {renderSection(
        "Interact",
        "Begin interacting with your chosen profile instantly and effortlessly.",
        <>
          {renderStep("Start Interacting", "startInteracting",
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Press the hotkey you designated in the Juno Chrome Extension and speak.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default QuickStart;