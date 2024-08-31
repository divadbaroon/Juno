"use client";
import React from 'react';
import ExtensionCreation from "@/components/shared/lab/labComponents/cardCreation/ExtensionCreation";
import LabHeader from '@/components/shared/lab/LabHeader'
import TabNavigation from '@/components/shared/lab/LabTabNavigation'
import { Separator } from "@/components/ui/separator";

export default function ProfileCreationPage() {
    
  return (
    <div className="root-container">
      <LabHeader/>

      <Separator className="my-4" />
      <TabNavigation />
      <Separator className="my-4" />

      <ExtensionCreation/>
    </div>
  );
}