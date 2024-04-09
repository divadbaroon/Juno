"use client";

import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const Guide = () => {
  return (
    <>
      
      <div className="root-container">
        <div className="about-section">
          <div className="space-y-6">
            <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '10px'}}>
            Guide
            </h4>
            <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
              Learn in detail how to create, customize, and interact with your personalized AI companion.
            </p>
          </div>
          <Separator className="my-4" />
        </div>

        <div>
          <h1>Coming soon...</h1>
        </div>
      </div>
    </>
  )
}

export default Guide