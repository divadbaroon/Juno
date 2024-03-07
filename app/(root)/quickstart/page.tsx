import React from 'react';

import { Separator } from "@/components/ui/separator";

const QuickStart = () => {
    return (
      <div className="about-section">
        {/* Overview Section */}
        <div className="section">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '0px' }}>Quick Start</h4>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Discover how to seamlessly integrate Juno into your browser within minutes.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Profile Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Overview</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Juno is a platform tailored for enriching your browsing experience with user-driven AI functionalities. Begin by setting up your profile to unlock the full potential of our tools. For an in-depth understanding, delve into our extensive library and laboratory sections.
          </p>
          <Separator className="my-4" />
        </div>
        
         {/* Voice Creation Section */}
         <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Personalize</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Choose a profile that resonates with you from our diverse collection to start personalizing your experience.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Usage</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Install the Juno Chrome Extension, define your preferred key-bindings, and dive into an interactive digital journey.
          </p>
          <Separator className="my-4" />
        </div>
      </div>
    );
};

export default QuickStart;
