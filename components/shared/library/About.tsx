import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; 

export const About = () => {
    // States to manage the visibility of dropdown content for each section
    const [showProfileExample, setShowProfileExample] = useState(false);
    const [showVoiceExample, setShowVoiceExample] = useState(false);
    const [showExtensionsExample, setShowExtensionsExample] = useState(false);
    return (
      <div className="about-section">
        {/* Overview Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Overview</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Welcome to The Library: Browse through a selction of profiles, extensions, LLMs, and voices. Once you find what you like easily incorporate it into Juno.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Profile Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Profiles</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Profiles are user-created AI entites equiped with their own personalites, voices, and capabilites.
          </p>
          <Button className="action-button" onClick={() => setShowProfileExample(!showProfileExample)} style={{marginTop: '15px' }}>Show Example</Button>
          {showProfileExample && (
              <div className="example-content" style={{ marginTop: '15px' }}>
                  {/* Example content here */}
                  <p>Example Profile: Juno - a friendly and intelligent AI assistant designed to provide real-time help and advice.</p>
              </div>
          )}
          <Separator className="my-4" />
        </div>
        
         {/* Voice Creation Section */}
         <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Extensions</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Extensions are outside functions created by users to enhance the capabilites of your AI.
          </p>
          <Button className="action-button" onClick={() => setShowVoiceExample(!showVoiceExample)} 
            style={{marginTop: '15px' }}>Show Example</Button>
          {showVoiceExample && (
              <div className="example-content" style={{ marginTop: '15px' }}>
                  {/* Example content here */}
                  <p>Example Voice: A digital version of a friendly, approachable, and articulate voice suitable for educational content.</p>
              </div>
          )}
          <Separator className="my-4" />
        </div>
        
        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Large-Language-Model</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Browse through a selection of open and closed source Large-Language-Models.
          </p>
          <Button className="action-button" onClick={() => setShowExtensionsExample(!showExtensionsExample)} style={{marginTop: '15px' }}>Show Example</Button>
          {showExtensionsExample && (
              <div className="example-content" style={{ marginTop: '15px' }}>
                  {/* Example content here */}
                  <p>Example Extension: A custom script that enables your AI to understand and interpret complex technical documents.</p>
              </div>
          )}
          <Separator className="my-4" />
        </div>
        
        {/* Share Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Voice</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Browse through a selection of high-quality human-like voices to find what is just right for you
          </p>
          <Button className="action-button" onClick={() => setShowExtensionsExample(!showExtensionsExample)} style={{marginTop: '15px' }}>Show Example</Button>
          {showExtensionsExample && (
              <div className="example-content" style={{ marginTop: '15px' }}>
                  {/* Example content here */}
                  <p>Example Extension: A custom script that enables your AI to understand and interpret complex technical documents.</p>
              </div>
          )}
          <Separator className="my-4" />
        </div>
      </div>
    );
}
