"use client";
import React, { useState } from 'react';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; 

const Home = async ({ searchParams }: SearchParamProps) => {
// States to manage the visibility of dropdown content for each section
const [showProfileExample, setShowProfileExample] = useState(false);
const [showVoiceExample, setShowVoiceExample] = useState(false);
const [showExtensionsExample, setShowExtensionsExample] = useState(false);
return (
  <div className="about-section">
    {/* Overview Section */}
    <div className="section">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: 'px' }}>Juno</h4>
        <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
          A platform that empowers you to create, customize, and interact with your own AI companion utilizing the most cutting-edge AI technology. 
        </p>
      <Separator className="my-4" />
    </div>
    
    {/* Profile Creation Section */}
    <div className="section">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Profiles</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Profiles are used to construct a distinct AI persona.
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
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Voices</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Explore a vast library of high-quality voices or create your own voice from scratch.
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
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Extensions</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Enhance the capabilites of your AI using extensions which are user-made functions created to extend the capabilites of your AI.
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
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Share</h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Embrace the spirit of collaboration by sharing your AI creations with the vibrant Juno community. Showcase the unique personalities, voices, and functionalities you've meticulously crafted.
      </p>
    </div>
  </div>
);
}

export default Home