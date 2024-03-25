"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator"

import { ProfileCreation } from "@/components/shared/lab/ProfileCreation"
import { VoiceCreation } from "@/components/shared/lab/VoiceCreation"
import { ExtensionCreation } from "@/components/shared/lab/ExtensionCreation"
import { PromptCreation } from "@/components/shared/lab/PromptCreation"

function ProfileForm() {
  // The actively selected Tab
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="root-container">
      <div className="space-y-1">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '-35px' }}>The Lab</h4>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Craft custom AI profiles, voices, and extensions tailored to your unique preferences and imagination.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('profile')}>Profile Creation</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('voice')}>Voice Creation</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('extension')}>Extension Creation</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('prompt')}>Prompt Creation</div>
      </div>
      <Separator className="my-4" />

      {activeSection === 'profile' && <ProfileCreation />}
      {activeSection === 'voice' && <VoiceCreation />}
      {activeSection === 'extension' && <ExtensionCreation />}
      {activeSection === 'prompt' && <PromptCreation />}
    </div>
  )
}

export default ProfileForm
