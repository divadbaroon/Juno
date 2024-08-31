"use client";
import React from 'react';
import { Separator } from "@/components/ui/separator";

import LabHeader from '@/components/shared/lab/LabHeader'
import LabTabNavigation from '@/components/shared/lab/LabTabNavigation'

function LabMainPage() {
  return (
    <div className="root-container">
      <LabHeader/>

      <Separator className="my-4" />

      <LabTabNavigation />

      <Separator className="my-4" />
    </div>
  )
}

export default LabMainPage;