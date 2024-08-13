"use client";
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { Separator } from "@/components/ui/separator"

import { LibraryPage } from "@/components/shared/library/LibraryPage"

function ProfileForm() {
  // The actively selected Tab
  const [activeSection, setActiveSection] = useState('profile');
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0); // Trigger for re-fetching


  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to fully initialize

    if (!isSignedIn) {
      redirect('/sign-in'); // Use Next.js's redirect for client-side redirection
      return;
    }

    const fetchUserDetails = async () => {
      try {
        // Assuming you have a user ID to fetch additional details
        if (user) {
          const details = await getUserById(user.id);
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Optionally handle errors, like redirecting to an error page
      }
    };

    fetchUserDetails();
  }, [isSignedIn, isLoaded, user, reloadCounter]); // Add reloadCounter as a dependency

  const handleReload = () => {
    setReloadCounter((prev) => prev + 1); // Function to trigger re-fetching
  };

  if (!userDetails) {
    return; // Placeholder while loading
  }

  return (
    <div className="root-container">
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '10px'}}>
            The Library
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px', marginLeft: '3px'  }}>
            A curated collection of pre-built, ready-to-use AI components.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('profile')}>Profiles</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('llm')}>LLMs</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('voice')}>Prompts</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('voice')}>Voices</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('extension')}>Extensions</div>

      </div>
      <Separator className="my-4" />

      {activeSection === 'profile' && <LibraryPage 
          contextType="Library"
          libraryType="Profiles" 
          h2Text="Profiles" 
          pText="Explore pre-configured profiles, powered by Large Language Models, lifelike voices, and unique capabilities. Select a profile that resonates, and refine it to match your needs."
          user={userDetails}
          onReload={handleReload}
          />}
      {activeSection === 'extension' && <LibraryPage
          contextType="Library"
          libraryType="Extensions" 
          h2Text="Extensions" 
          pText="Use extensions to add capabilites and enhancements to your AI. Add as many extensions as you need to create the perfect AI for your needs."
          user={userDetails}
          onReload={handleReload}
      />}
      {activeSection === 'voice' && <LibraryPage
          contextType="Library"
          libraryType="Voices" 
          h2Text="Voices" 
          pText="Personalize your AI's voice from a wide range of lifelike options, enhancing communication with styles from warm and friendly to formal and authoritative."
          user={userDetails}
          onReload={handleReload}
      />}
      {activeSection === 'llm' && <LibraryPage 
          contextType="Library"
          libraryType="LLMs" 
          h2Text="Large Language Models" 
          pText="Choose the Large Language Model powering your AI's intelligence, aligning with your preferences for reasoning, coding, speed, and expertise."
          user={userDetails}
          onReload={handleReload}
          />}
    </div>
  )
}

export default ProfileForm
