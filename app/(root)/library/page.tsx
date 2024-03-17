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
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '-15px' }}>The Library</h4>
        
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
          pText="Discover our wide range of AI profiles tailored for different needs and preferences. Whether you're seeking a professional advisor or a personal companion, navigate through our collection to find your perfect AI match."
      />}
      {activeSection === 'extension' && <LibraryPage
          contextType="Library"
          libraryType="Extensions" 
          h2Text="Extensions" 
          pText="Enhance your AI's abilities with our unique extensions. Browse through our library to find tools and features that add extra functionality to your AI, from advanced analytics to interactive games."
      />}
      {activeSection === 'voice' && <LibraryPage
          contextType="Library"
          libraryType="Voices" 
          h2Text="Voices" 
          pText="Personalize your AI's interaction with our selection of voices. From warm and friendly to formal and authoritative, choose the voice that best fits your style and enhances your AI's communication."
      />}
      {activeSection === 'llm' && <LibraryPage 
          contextType="Library"
          libraryType="LLMs" 
          h2Text="Large-Language Models" 
          pText="Explore our assortment of large-language models to supercharge your AI. Select from a variety of models that offer different strengths, from natural language understanding to creative content generation."
      />}

    </div>
  )
}

export default ProfileForm
