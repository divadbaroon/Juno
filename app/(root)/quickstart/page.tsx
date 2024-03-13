"use client";

import React, { useState } from 'react';

import { LibraryPage } from "@/components/shared/library/LibraryPage"

import { Separator } from "@/components/ui/separator";

const QuickStart = () => {

    // State hook
    const [showProfileCreation, setShowProfileCreation] = useState(false);
    const [showLargeLanguageModel, setShowLargeLanguageModel] = useState(false);
    const [showVoice, setShowVoice] = useState(false);
    const [showExtensions, setShowExtensions] = useState(false);

    const [showUsageStep1, setShowUsageStep1] = useState(false);
    const [showUsageStep2, setShowUsageStep2] = useState(false);
    const [showUsageStep3, setShowUsageStep3] = useState(false);
    return (
      <div className="about-section">
        
        <div className="section">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '25px' }}>Quick Start</h4>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          A step-by-step guide to creating and integrating your own AI companion within minutes.          
          </p>
          <Separator className="my-4" />
        </div>
        
         <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Customize</h2>
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Personalize your companion by selecting from a wide range of profiles, voices, and extensions, and adjust the large language model to suit your needs.
            </p>
            <div onClick={() => setShowProfileCreation(!showProfileCreation)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">1. Choose a Profile</h2>
            </div>
            {showProfileCreation && <LibraryPage 
                h2Text="Profiles" 
                pText="Begin by choosing a profile from our extensive collection of profiles to find the perfect match for your personality and requirements."
                libraryType="Profiles"
            />}
            <div onClick={() => setShowVoice(!showVoice)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">2. Adjust the Voice</h2>
            </div>
            {showVoice && <LibraryPage 
                h2Text="Voices" 
                pText="Browse through Juno's selection of voices and select a new voice for your profile. (Optional)"
                libraryType="Voices"
            />}
            <div onClick={() => setShowLargeLanguageModel(!showLargeLanguageModel)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">3. Adjust the AI Model</h2>
            </div>
            {showLargeLanguageModel && <LibraryPage 
                h2Text="Large Language Models" 
                pText="Browse through Juno's selection of LLMs and select a new model to power your profile. (Optional)"
                libraryType="LLMs"
            />}
            <div onClick={() => setShowExtensions(!showExtensions)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">4. Add Extensions</h2>
            </div>
            {showExtensions && <LibraryPage 
                h2Text="Extensions" 
                pText="Enhance your profile's capabilities by selecting from a wide range of extensions designed to boost functionality and usability. (Optional)"
                libraryType="Extensions"
            />}
          <Separator className="my-4" />
        </div>
        
        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Integrate</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Seamlessly integrate your tailored companion into your browsing experience with the Juno Chrome Extension, which syncs automatically with the Juno website.
          </p>
          <div onClick={() => setShowUsageStep1(!showUsageStep1)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">1. Install the Juno Browser Extension</h2>
          </div>
          {showUsageStep1 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Install the Juno Chrome Extension.
            </p>
          )}
          <div onClick={() => setShowUsageStep2(!showUsageStep2)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">2. Set Up Hotkeys</h2>
          </div>
          {showUsageStep2 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Configure your preferred key-bindings for smooth interaction.
            </p>
          )}
          <div onClick={() => setShowUsageStep3(!showUsageStep3)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">3. Start Interacting</h2>
          </div>
          {showUsageStep3 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Interact by holding the key-bind and speaking to your AI companion.
            </p>
          )}
          <Separator className="my-4" />
        </div>

        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Explore</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Explore Juno's features and functionalities to enhance your browsing experience and productivity.
          </p>
          <div onClick={() => setShowUsageStep1(!showUsageStep1)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">1. Discover New Features</h2>
          </div>
          {showUsageStep1 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Install the Juno Chrome Extension.
            </p>
          )}
          <div onClick={() => setShowUsageStep2(!showUsageStep2)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">2. Join the Community</h2>
          </div>
          {showUsageStep2 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Configure your preferred key-bindings for smooth interaction.
            </p>
          )}
          <div onClick={() => setShowUsageStep3(!showUsageStep3)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">3. Provide Feedback</h2>
          </div>
          {showUsageStep3 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Interact by holding the key-bind and speaking to your AI companion.
            </p>
          )}
          <Separator className="my-4" />
        </div>
      </div>
    );
};

export default QuickStart;
