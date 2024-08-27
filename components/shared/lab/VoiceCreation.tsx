"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from 'next/navigation';
import { Separator } from "@/components/ui/separator";

export const VoiceCreation = () => {
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
  }, [isSignedIn, isLoaded, user, reloadCounter]);

  if (!userDetails) {
    return <div>Loading...</div>; // Placeholder while loading
  }

  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-10px' }}>
        Voice Cloning
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Quickly clone any voice of your choice with just a 5-minute file upload. 
      </p>
      <Separator className="my-4" />

    </div>
  );
};

export default VoiceCreation;