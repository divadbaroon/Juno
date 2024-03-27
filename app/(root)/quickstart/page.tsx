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
    <div className="root-container">
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px'}}>
          Quick Start
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px', marginLeft: '3px'  }}>
            A step-by-step guide on how to quickly customize and interact with your own personalized AI.
          </p>
        </div>
        <Separator className="my-4" />
      </div>

      {renderSection(
        "Create",
        "Create your AI from the ground up, utilizing the most cutting-edge AI solutions for each component.",
        <>
          {renderStep("1. Select a Profile", "profileCreation",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Profiles"
              h2Text=""
              pText="To get started, select a profile to provide your foundation. Profiles are pre-configured AI, made up of a large language model, instructions for the language model, a unique voice, and distinct capabilites."/>
          )}
          {renderStep("2. Adjust the Voice", "voice",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Voices"
              h2Text=""
              pText="Browse through a collection of life-like voices. If you find one you like, select it to update your profile; otherwise, move on and retain your profile's existing voice."
            />
          )}
          {renderStep("3. Adjust the AI Model", "languageModel",
            <LibraryPage
              contextType="QuickStart"
              libraryType="LLMs"
              h2Text=""
              pText="Browse through a collection of Large Language Models, the core intelligence of your AI. If you find one you like, select it to update your profile; otherwise, move on and retain your profile's existing LLM."
            />
          )}
          {renderStep("4. Enhance Capabilites", "extensions",
            <LibraryPage
              contextType="QuickStart"
              libraryType="Extensions"
              h2Text=""
              pText="Browse through a collection of extensions, which are additional capabilites that can be added to your profile. Add as many extensions as you would like, or move on and keep your profile's current extensions."
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