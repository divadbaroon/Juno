"use client";
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { Separator } from "@/components/ui/separator"

import LibraryHeader from '@/components/shared/library/LibraryHeader'
import LibraryTabNavigation from '@/components/shared/library/LibraryTabNavigation'

function ProfileForm() {
  const [activeSection, setActiveSection] = useState('profile');
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0); 

  useEffect(() => {
    if (!isLoaded) return; 

    if (!isSignedIn) {
      redirect('/sign-in'); 
      return;
    }

    const fetchUserDetails = async () => {
      try {
        if (user) {
          const details = await getUserById(user.id);
          setUserDetails(details);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [isSignedIn, isLoaded, user, reloadCounter]); 

  const handleReload = () => {
    setReloadCounter((prev) => prev + 1); 
  };

  if (!userDetails) {
    return; 
  }

  return (
    <div className="root-container">

      <LibraryHeader/>

      <Separator className="my-4" />
      
      <LibraryTabNavigation/>
      
      <Separator className="my-4" />

    </div>
  )
}

export default ProfileForm
