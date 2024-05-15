"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from 'next/navigation';
import { LibraryPage } from "@/components/shared/library/LibraryPage";
import { Separator } from "@/components/ui/separator";

interface Data {
  _id: string;
  // Add other properties as needed
}

export const VoiceCreation = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isToggled, setIsToggled] = useState(true);

  // State hooks to track completion of sections
  const [isVoiceComplete, setIsVoiceComplete] = useState(false);

  // State hooks to store form data
  const [voice, setVoice] = useState("");

  const [selections, setSelections] = useState({
    voice: null,
  });

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

  const handleReload = () => {
    setReloadCounter((prev) => prev + 1); // Function to trigger re-fetching
  };

  if (!userDetails) {
    return <div>Loading...</div>; // Placeholder while loading
  }

  const handleVoiceSelect = (selectedVoice: Data | null) => {
    setIsVoiceComplete(true);
    setVoice(selectedVoice ? selectedVoice._id : '');
  };

  const isVoiceSectionComplete = isVoiceComplete && selections.voice !== null;

  return (
    <div className="root-container">
      <h2 className="h2-bold text-dark-600" style={{ marginTop: '-10px' }}>
        Voice Creation
      </h2>
      <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
        Choose a unique voice that complements your AI&apos;s personality and enhances the user experience.
      </p>
      <Separator className="my-4" />

      {/* Toggle Switch */}
      <div className="flex justify-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isToggled}
            onChange={(e) => setIsToggled(e.target.checked)}
          />
          <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Library</span>
        </label>
      </div>

      {/* Voice Section */}
      {isToggled && (
        <LibraryPage
          contextType="Lab"
          libraryType="Voices"
          h2Text=""
          pText=""
          user={userDetails}
          onReload={handleReload}
          onSelect={handleVoiceSelect}
          selectedCardId={selections.voice}
        />
      )}
    </div>
  );
};

export default VoiceCreation;