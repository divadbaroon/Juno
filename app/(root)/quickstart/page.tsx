import React from 'react';

import { Separator } from "@/components/ui/separator";

export const QuickStart = () => {
    return (
      <div className="about-section">
        {/* Overview Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Quick Start</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Get a curated AI integrated into your webbrowser in under 3 minutes.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Profile Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Overview</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Juno is a highly customizable platform for integrating user curated AI into the webbrowser for enhanced browsing experience and capablilties. This section focues on quickly getting you setup with a profile. However, to further see the capabilites of this platform it's recommended to look into the library and lab sections.
          </p>
          <Separator className="my-4" />
        </div>
        
         {/* Voice Creation Section */}
         <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Select A profile</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Browse through and select a profile that speaks to you.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Usage</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Install the Juno Chrome Extension, set a key-bind, and interact. That's it.
          </p>
          <Separator className="my-4" />
        </div>
      </div>
    );
}
