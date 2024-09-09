"use client";
import React from 'react';
import ExtensionCreation from "@/components/shared/lab/labComponents/cardCreation/ExtensionCreation";
import LabHeader from '@/components/shared/lab/LabHeader'
import TabNavigation from '@/components/shared/lab/LabTabNavigation'
import { Separator } from "@/components/ui/separator";

export default function ProfileCreationPage() {
    
  return (
    <div className="root-container p-8">

      <LabHeader/>

      <Separator className="my-8" />

      <div className="mb-8"> 
        <TabNavigation />
      </div>

      <Separator className="my-8" />

      <ExtensionCreation/>
    </div>
  );
}