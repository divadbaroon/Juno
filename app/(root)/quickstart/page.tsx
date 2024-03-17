"use client";

import React, { useState, ReactNode } from 'react';
import { LibraryPage } from "@/components/shared/library/LibraryPage";
import { Separator } from "@/components/ui/separator";

const QuickStart = () => {
  const [openStep, setOpenStep] = useState<string | null>(null);

  const renderSection = (title: string, description: string, steps: ReactNode) => (
    <div className="section">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>{title}</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>{description}</p>
      {steps}
      <Separator className="my-4" />
    </div>
  );

  const renderStep = (title: string, stepKey: string, content: ReactNode) => (
    <>
      <div
        onClick={() => setOpenStep(openStep === stepKey ? null : stepKey)}
        className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4"
      >
        <h2 className="text-lg font-bold text-dark-600">{title}</h2>
      </div>
      {openStep === stepKey && content}
    </>
  );

  return (
    <div className="about-section">
      <div className="section">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '0px' }}>Quick Start</h4>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          A step-by-step guide on how to quickly customize and interact with your own personalized AI.
        </p>
        <Separator className="my-4" />
      </div>

      {renderSection(
        "Customize",
        "Personalize your AI from the ground up, utilizing the most cutting-edge AI solutions publicly available.",
        <>
          {renderStep("1. Choose a Profile", "profileCreation",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Profiles"
              h2Text=""
              pText="Profiles are fully customized and enhanced Large-Language models. Click a profile to read its details."
            />
          )}
          {renderStep("2. Adjust the Voice", "voice",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Voices"
              h2Text=""
              pText="Browse through a selection of life-like voices. If you find one you like, select it, and your profile will automatically be updated with the new voice, or move on and keep your profile's current voice."
            />
          )}
          {renderStep("3. Adjust the AI Model", "languageModel",
            <LibraryPage
              contextType="QuickStart"
              libraryType="LLMs"
              h2Text=""
              pText="Browse through a collection of Large-Language-Models, which is the underlying intelligence powering your profile. If you find one you like, select it, and your profile will automatically be updated with the new LLM, or move on and keep your profile's current LLM."
            />
          )}
          {renderStep("4. Add Extensions", "extensions",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Extensions"
              h2Text=""
              pText="Browse through a collection of extensions, which are additional capabilites that can be added to your profile. Select as many extensions as you would like, or move on and keep your profile's current extensions."
            />
          )}
        </>
      )}

      {renderSection(
        "Integrate",
        "Seamlessly integrate your tailored companion into your browsing experience with the Juno Chrome Extension, which syncs automatically with the Juno website.",
        <>
          {renderStep("1. Install the Juno Browser Extension", "installExtension",
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Install the Juno Chrome Extension.
            </p>
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
        "Interact with your AI companion by speaking to it using the hotkey set in the Juno Chrome Extension.",
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