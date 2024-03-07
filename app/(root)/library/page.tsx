"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator"

import { LibraryPage } from "@/components/shared/library/LibraryPage"

export function ProfileForm() {
  // The actively selected Tab
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="root-container">
      <div className="space-y-1">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '-34px' }}>The Library</h4>
        <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
          Your ultimate source for customizing Juno, your personal AI companion. Explore our extensive collection of profiles, extensions, voices, and language models designed to enhance your digital life.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('profile')}>Profiles</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('extension')}>Extensions</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('voice')}>Voices</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('llm')}>LLMs</div>
        <Separator orientation="vertical" />
      </div>
      <Separator className="my-4" />

      {activeSection === 'profile' && <LibraryPage 
          h2Text="Profiles" 
          pText="Discover our wide range of AI profiles tailored for different needs and preferences. Whether you're seeking a professional advisor or a personal companion, navigate through our collection to find your perfect AI match."
      />}
      {activeSection === 'extension' && <LibraryPage
          h2Text="Extensions" 
          pText="Enhance your AI's abilities with our unique extensions. Browse through our library to find tools and features that add extra functionality to your AI, from advanced analytics to interactive games."
      />}
      {activeSection === 'voice' && <LibraryPage
          h2Text="Voices" 
          pText="Personalize your AI's interaction with our selection of voices. From warm and friendly to formal and authoritative, choose the voice that best fits your style and enhances your AI's communication."
      />}
      {activeSection === 'llm' && <LibraryPage 
          h2Text="Large-Language Models" 
          pText="Explore our assortment of large-language models to supercharge your AI. Select from a variety of models that offer different strengths, from natural language understanding to creative content generation."
      />}

    </div>
  )
}

export default ProfileForm
