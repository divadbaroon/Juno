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
        "Create",
        "Create your AI from the ground up, utilizing the most cutting-edge AI solutions publicly available at each step.",
        <>
          {renderStep("1. Select a Profile", "profileCreation",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Profiles"
              h2Text=""
              pText="Begin by choosing from a variety of pre-built profiles, each featuring a fully configured Large Language Model, distinct voice, and unique capabilities. Select a profile that resonates with you, you can always refine it later to perfectly match your needs."/>
          )}
          {renderStep("2. Adjust the Voice", "voice",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Voices"
              h2Text=""
              pText="Browse through Juno's collection of lifelike voices. If one resonates with you, select it to update your profile immediately; otherwise, feel free to retain the existing voice."
            />
          )}
          {renderStep("3. Adjust the AI Model", "languageModel",
            <LibraryPage
              contextType="QuickStart"
              libraryType="LLMs"
              h2Text=""
              pText="Explore a selection of cutting-edge Large Language Models, the core intelligence of your AI. Choose one that enhances your profile's capabilities, and it will seamlessly update; otherwise, retain your current model."
            />
          )}
          {renderStep("4. Enhance Capabilites", "extensions",
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
        "Seamlessly embed Juno into your browser for effortless AI interaction.",
        <>
          {renderStep("1. Install the Juno Browser Extension", "installExtension",
            <div style={{ marginTop: '15px' }}>
            <p className="p-20-regular text-dark-400 mt-2">
              <strong>1. Convenient Access:</strong> With the Juno Chrome Extension, your AI companion is just a click away. No need to switch between apps or websites – Juno is always ready to assist you, right where you are.
            </p>
            <p className="p-20-regular text-dark-400 mt-2">
              <strong>2. Contextual Assistance:</strong> Juno's browser integration enables your AI to provide contextual assistance based on the websites you visit and the content you interact with. Whether you're researching a topic, writing an essay, or browsing social media, your AI can offer relevant insights and suggestions.
            </p>
            <p className="p-20-regular text-dark-400 mt-2">
              <strong>3. Seamless Sync:</strong> The Juno Chrome Extension seamlessly syncs with your account, ensuring that your AI preferences, custom profiles, and chat history are always up to date, no matter which device you're using.
            </p>
            <p className="p-20-regular text-dark-400 mt-2">
              <strong>4. Enhanced Productivity:</strong> With Juno integrated into your browser, you can streamline your workflow and boost your productivity. Your AI can help you with tasks like data analysis, content creation, and more, all without leaving your browser.
            </p>
            <p className="p-20-regular text-dark-400 mt-2">
              <strong>5. Customizable Hotkeys:</strong> Tailor your interaction experience by setting up custom hotkeys for quick access to Juno's features. Whether you prefer keyboard shortcuts or voice commands, Juno adapts to your workflow seamlessly.
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