"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { redirect } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/lib/actions/user.actions";

import { LibraryPage } from "@/components/shared/library/LibraryPage";

interface SearchParamProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Profile = ({ searchParams }: SearchParamProps) => {
  const [activeSection, setActiveSection] = useState('profile');
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

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

  // Example of displaying user details
  const { plan: userPlan, usageLeft: userTimeLeft } = userDetails;
  const hours = Math.floor(userTimeLeft / 3600);
  const minutes = Math.floor((userTimeLeft % 3600) / 60);
  const seconds = userTimeLeft % 60;
  const timeLeftString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="root-container">
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '10px'}}>
            Dashboard
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
            Quickly see your account usage and your current plan.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CURRENT PLAN</p>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="h2-bold text-dark-600">{userPlan}</h2>
          </div>
        </div>
        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">USAGE FOR TODAY LEFT</p>
          <div className="mt-4 flex items-center gap-4">
            <h2 className="h2-bold text-dark-600">{timeLeftString}</h2>
          </div>
        </div>
      </section>
      <Separator className="my-8" />
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '20px' }}>
            My Collection
          </h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
            A collection of AI components that you have either saved or created.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('profile')}>Profiles</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('extension')}>Extensions</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('voice')}>Voices</div>
        <Separator orientation="vertical" />
        <div className="p-20-regular text-dark-400 cursor-pointer" onClick={() => setActiveSection('llm')}>LLMs</div>
        <Separator orientation="vertical" />
      </div>
      <Separator className="my-4" />

      {activeSection === 'profile' && <LibraryPage 
          contextType="Dashboard"
          libraryType="Profiles" 
          h2Text="Profiles" 
          pText="Explore pre-configured profiles, powered by Large Language Models, lifelike voices, and unique capabilities. Select a profile that resonates, and refine it to match your needs."
          user={userDetails}
          onReload={handleReload}
          />}
      {activeSection === 'extension' && <LibraryPage
          contextType="Dashboard"
          libraryType="CollectionExtensions" 
          h2Text="Extensions" 
          pText="Use extensions to add capabilites and enhancements to your AI. Add as many extensions as you need to create the perfect AI for your needs."
          user={userDetails}
          onReload={handleReload}
      />}
      {activeSection === 'voice' && <LibraryPage
          contextType="Dashboard"
          libraryType="CollectionVoices" 
          h2Text="Voices" 
          pText="Personalize your AI's voice from a wide range of lifelike options, enhancing communication with styles from warm and friendly to formal and authoritative."
          user={userDetails}
          onReload={handleReload}
      />}
      {activeSection === 'llm' && <LibraryPage 
          contextType="Dashboard"
          libraryType="CollectionLLMs" 
          h2Text="Large Language Models" 
          pText="Choose the Large Language Model powering your profile's intelligence, aligning with your preferences for reasoning, coding, speed, and expertise."
          user={userDetails}
          onReload={handleReload}
          />}
    </div>
  )
}

export default Profile