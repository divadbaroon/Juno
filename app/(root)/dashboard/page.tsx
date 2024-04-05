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
    </div>
  )
}

export default Profile