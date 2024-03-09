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
            The lab is your dedicated space for AI customization. Here, you can mold and refine your AI to meet your exact specifications. Dive into the realm of personalized artificial intelligence and transform your ideas into reality.
          </p>
          <Separator className="my-4" />
        </div>
        
        {/* Profile Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Profile Creation</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            In the Profile Creation area, unleash your creativity to construct a distinct AI persona. Complete the forms to tailor attributes such as name, persona, personality, and role.
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
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Voice Creation</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Step into the Voice Creation suite and discover the power to clone any voice in mere minutes. Give your AI a unique vocal identity that perfectly matches its personality.
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
          <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>Extensions Creation</h2>
          <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          In the Extension Creation workshop, the possibilities for your AI's capabilities are endless. Develop custom extensions that push the boundaries of what your AI can do, making it an indispensable part of your digital life.
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
