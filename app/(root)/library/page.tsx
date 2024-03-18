"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator"

import { LibraryPage } from "@/components/shared/library/LibraryPage"

function ProfileForm() {
  // The actively selected Tab
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="root-container">
      <div className="space-y-1">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '-35px' }}>The Library</h4>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Explore our curated collection of pre-made AI profiles, voices, language models, and extensions 
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
          contextType="Library"
          libraryType="Profiles" 
          h2Text="Profiles" 
          pText="Browse through a collection of AI profiles, each serving a unique experience, purpose, and feel to your AI interactions."
          />}
      {activeSection === 'extension' && <LibraryPage
          contextType="Library"
          libraryType="Extensions" 
          h2Text="Extensions" 
          pText="Use extensions to add capabilites and enhancements to your AI. Add as many extensions as you need to create the perfect AI for your needs."
      />}
      {activeSection === 'voice' && <LibraryPage
          contextType="Library"
          libraryType="Voices" 
          h2Text="Voices" 
          pText="Personalize how your AI sounds by selecting from our wide-range of life-like voices. From warm and friendly to formal and authoritative, choose the voice that best fits your style and enhances your AI's communication."
      />}
      {activeSection === 'llm' && <LibraryPage 
          contextType="Library"
          libraryType="LLMs" 
          h2Text="Large-Language Models" 
          pText="Select the Large Language Model that provides your profile's underlying intelligence. Different LLMs have different strengths and weaknesses, such as reasoning, coding abilities, speed, and expertise on certain topics. Choose the one that best aligns with your preferences and requirements."
          />}

    </div>
  )
}

export default ProfileForm
