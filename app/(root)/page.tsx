"use client";

import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <>
      <div className="root-container">
        <div className="space-y-6">
        <h4 className="h2-bold text-dark-600 custom-font-size" style={{ marginTop: '10px' }}>
          Welcome to Juno
        </h4>          
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px', marginLeft: '3px'  }}>
            The all-in-one platform for steamlined AI customization and interaction.
          </p>
          
        </div>
        <Separator className="my-4" />

        {/* What is Juno Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>What is Juno?</h2>
            <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6', marginLeft: '3px'  }}>
            Juno allows you to customize AI for any use case or scenario. Quickly communicate with your AI using a shortcut of your choosing.           
              </p>
        </div>                 
        <Separator className="my-8" />


        {/* Getting Started Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Getting Started</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6', marginLeft: '3px'  }}>
          Get started by exploring Juno&apos;s <Link href="/quickstart" className="text-primary-600 underline">Quick Start guide</Link>. This step-by-step tutorial will walk you through creating and integrating your own personalized AI in minutes.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Dive Deeper Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Create in the Lab</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6', marginLeft: '3px'  }}>
            Visit the <Link href="/lab" className="text-primary-600 underline">Lab</Link> to create your own AI from the ground up, tailoring every detail to your exact preferences.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Explore Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Explore the Library</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6', marginLeft: '3px'  }}>
            Discover a vast collection of ready-to-use AI components in Juno&apos;s <Link href="/library" className="text-primary-600 underline">Library</Link>, where you&apos;ll find pre-made AI profiles, voices, language models, and extensions ready for use.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Open Architecture Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Seamlessly Interact</h2>
            <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6', marginLeft: '3px'  }}>
              Use the Juno Chrome Extension to easily interact with your personalized AI, using a simple keybind.
            </p>
        </div>
      </div>
    </>
  )
}

export default Home