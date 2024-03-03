"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator"

import { About } from "@/components/shared/library/About"
import { CardContainer } from "@/components/shared/library/CardContainer"

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
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('profile')}>Library</div>
      </div>
      <Separator className="my-4" />

      {activeSection === 'about' && <About />}
      {activeSection === 'profile' && <CardContainer />}
    </div>
  )
}

export default ProfileForm
