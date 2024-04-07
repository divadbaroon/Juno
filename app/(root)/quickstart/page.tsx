"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { LibraryPage } from "@/components/shared/library/LibraryPage";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

interface Data {
  _id: string;
}

/**
 * QuickStart component represents a step-by-step guide for customizing and interacting with a personalized AI.
 */
const QuickStart = () => {
  const [openStep, setOpenStep] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

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
    if (!isLoaded) return; // Wait for Clerk to fully initialize

    if (!isSignedIn) {
      redirect('/sign-in'); // Use Next.js's redirect for client-side redirection
      return;
    }

    /**
     * Fetches user details based on the user ID.
     */
    const fetchUserDetails = async () => {
      try {
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

  /**
   * Triggers a reload of the user details.
   */
  const handleReload = () => {
    setReloadCounter((prev) => prev + 1);
  };

  if (!userDetails) {
    return; // Placeholder while loading
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


  /**
   * Renders a section with a title, description, and steps.
   * @param title - The title of the section.
   * @param description - The description of the section.
   * @param steps - The steps to be rendered within the section.
   */
  const renderSection = (title: string, description: string, steps: ReactNode) => (
    <div className="section">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>{title}</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginBottom: '15px' }}>{description}</p>
      {steps}
      <Separator className="my-4" />
    </div>
  );

  /**
   * Renders a step with a title and content that can be expanded/collapsed.
   * @param title - The title of the step.
   * @param stepKey - The unique key for the step.
   * @param content - The content to be rendered when the step is expanded.
   */
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
            A step-by-step guide on how to quickly customize and interact with your own personalized AI.
          </p>
        </div>
        <Separator className="my-4" />
      </div>

      {renderSection(
        "Create",
        "Create your AI from the ground up, utilizing the most cutting-edge AI solutions for each component.",
        <>
          {renderStep("1. Select a Profile", "profile",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Profiles"
              h2Text=""
              pText="To get started, select a profile to provide your foundation. Profiles are pre-configured AI, made up of a large language model, instructions for the language model, a unique voice, and distinct capabilites."
              user={userDetails}
              onReload={handleReload}
            />
          )}
          {renderStep("2. Adjust the Voice", "voice",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Voices"
              h2Text=""
              pText="Browse through a collection of life-like voices. If you find one you like, select it to update your profile; otherwise, move on and retain your profile's existing voice."
              user={userDetails}
              onReload={handleReload}
            />
          )}
          {renderStep("3. Adjust the AI Model", "llm",
            <LibraryPage
              contextType="QuickStart"
              libraryType="LLMs"
              h2Text=""
              pText="Browse through a collection of Large Language Models, the core intelligence of your AI. If you find one you like, select it to update your profile; otherwise, move on and retain your profile's existing LLM."
              user={userDetails}
              onReload={handleReload}
            />
          )}
          {renderStep("4. Enhance Capabilites", "extensions",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Extensions"
              h2Text=""
              pText="Browse through a collection of extensions, which are additional capabilites that can be added to your profile. Add as many extensions as you would like, or move on and keep your profile's current extensions."
              user={userDetails}
              onReload={handleReload}
            />
          )}
        </>
      )}

      {renderSection(
        "Integrate",
        "Seamlessly embed Juno into your browser for effortless AI interaction.",
        <>
          {renderStep("1. Install the Juno Browser Extension", "installExtension",
            <div style={{ marginTop: '15px' }}>
              <p className="p-20-regular text-dark-400 mt-2">
                <strong>1. Convenient Access:</strong> With the Juno Chrome Extension, your AI companion is just a click away. No need to switch between apps or websites – Juno is always ready to assist you, right where you are.
              </p>
              <p className="p-20-regular text-dark-400 mt-2">
                <strong>2. Contextual Assistance:</strong> Juno&apos;s browser integration enables your AI to provide contextual assistance based on the websites you visit and the content you interact with. Whether you&apos;re researching a topic, writing an essay, or browsing social media, your AI can offer relevant insights and suggestions.
              </p>
              <p className="p-20-regular text-dark-400 mt-2">
                <strong>3. Seamless Sync:</strong> The Juno Chrome Extension seamlessly syncs with your account, ensuring that your AI preferences, custom profiles, and chat history are always up to date, no matter which device you&apos;re using.
              </p>
              <p className="p-20-regular text-dark-400 mt-2">
                <strong>4. Enhanced Productivity:</strong> With Juno integrated into your browser, you can streamline your workflow and boost your productivity. Your AI can help you with tasks like data analysis, content creation, and more, all without leaving your browser.
              </p>
              <p className="p-20-regular text-dark-400 mt-2">
                <strong>5. Customizable Hotkeys:</strong> Tailor your interaction experience by setting up custom hotkeys for quick access to Juno&apos;s features. Whether you prefer keyboard shortcuts or voice commands, Juno adapts to your workflow seamlessly.
              </p>
            </div>
          )}
          {renderStep("2. Set Up Hotkeys", "setupHotkeys",
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Configure your preferred key-bindings for smooth interaction.
            </p>
          )}
        </>
      )}

      {renderSection(
        "Interact",
        "Effortlessly interact with your AI using your assigned hotkey.",
        <>
          {renderStep("1. Start Interacting", "startInteracting",
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