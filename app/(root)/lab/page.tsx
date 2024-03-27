"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator"

import { ProfileCreation } from "@/components/shared/lab/ProfileCreation"
import { VoiceCreation } from "@/components/shared/lab/VoiceCreation"
import { ExtensionCreation } from "@/components/shared/lab/ExtensionCreation"

function ProfileForm() {
  // The actively selected Tab
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="root-container">
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px'}}>
            The Lab
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px', marginLeft: '3px' }}>
            Create custom AI components to perfectly meet your unique needs and preferences.
          </p>
        </div>
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

      </div>
      <Separator className="my-4" />

      {activeSection === 'profile' && <ProfileCreation />}
      {activeSection === 'voice' && <VoiceCreation />}
      {activeSection === 'extension' && <ExtensionCreation />}
    </div>
  )
}

export default ProfileForm
