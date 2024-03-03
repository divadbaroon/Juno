"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator"

import { About } from "@/components/shared/lab/About"
import { ProfileCreation } from "@/components/shared/lab/ProfileCreation"
import { VoiceCreation } from "@/components/shared/lab/VoiceCreation"
import { ExtensionCreation } from "@/components/shared/lab/ExtensionCreation"

export function ProfileForm() {
  // The actively selected Tab
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="root-container">
      <div className="space-y-1">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '-34px' }}>The Lab</h4>
        <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
         Use the lab to create and customize your AI just the way you want.
      </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('about')}>About</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('profile')}>Profile Creation</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('voice')}>Voice Creation</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('extension')}>Extension Creation</div>
      </div>
      <Separator className="my-4" />

      {activeSection === 'about' && <About />}
      {activeSection === 'profile' && <ProfileCreation />}
      {activeSection === 'voice' && <VoiceCreation />}
      {activeSection === 'extension' && <ExtensionCreation />}
    </div>
  )
}

export default ProfileForm
