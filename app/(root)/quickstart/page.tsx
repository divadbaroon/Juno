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
        {/* Overview Section */}
        <div className="section">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '25px' }}>Quick Start</h4>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Quickly create your own personalized intelligent companion with Juno.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Profile Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Overview</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Juno is a platform that empowers you to create, customize, and interact with your own AI companion utilizing the most cutting-edge AI technology. 
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
            <h2 className="text-lg font-bold text-dark-600">1. Select a Profile</h2>
            </div>
            {showProfileCreation && <LibraryPage 
                h2Text="Profiles" 
                pText="Choose from our extensive collection of profiles to find the perfect match for your personality and requirements."
                libraryType="Profiles"
            />}
            <div onClick={() => setShowVoice(!showVoice)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">2. Adjust Voice</h2>
            </div>
            {showVoice && <LibraryPage 
                h2Text="Voices" 
                pText="Select a new voice for your companion. (Optional)"
                libraryType="Voices"
            />}
            <div onClick={() => setShowLargeLanguageModel(!showLargeLanguageModel)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">3. Adjust LLM</h2>
            </div>
            {showLargeLanguageModel && <LibraryPage 
                h2Text="LLMs" 
                pText="Select a LLM for your companion. (Optional)"
                libraryType="LLMs"
            />}
            <div onClick={() => setShowExtensions(!showExtensions)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">4. Add Extensions</h2>
            </div>
            {showExtensions && <LibraryPage 
                h2Text="Extensions" 
                pText="Enhance your companion's capabilities by selecting from a wide range of extensions designed to boost functionality and performance. (Optional)"
                libraryType="Extensions"
            />}
          <Separator className="my-4" />
        </div>
        
        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Usage</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Seamlessly integrate your tailored companion into your browsing experience with the Juno Chrome Extension, which syncs automatically with the Juno website.
          </p>
          <div onClick={() => setShowUsageStep1(!showUsageStep1)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">1. Install the Juno Chrome Extension</h2>
          </div>
          {showUsageStep1 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Install the Juno Chrome Extension.
            </p>
          )}
          <div onClick={() => setShowUsageStep2(!showUsageStep2)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">2. Set key-bind</h2>
          </div>
          {showUsageStep2 && (
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
              Configure your preferred key-bindings for smooth interaction.
            </p>
          )}
          <div onClick={() => setShowUsageStep3(!showUsageStep3)}
            className="cursor-pointer p-5 bg-gray-100 rounded-md shadow my-4">
            <h2 className="text-lg font-bold text-dark-600">3. Interact</h2>
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
