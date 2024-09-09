"use client";

import React, { useState, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { LibraryPage } from "@/components/shared/library/LibraryPage";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Chrome, Play, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Data {
  _id: string;
}

interface Selections {
  profile: string | null;
  installExtension: boolean;
  startInteracting: boolean;
}

const QuickStart = () => {
  const [openStep, setOpenStep] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const filters: {[key: string]: string} = {};
    searchParams.forEach((value, key) => {
        filters[key] = value;
    });
    setActiveFilters(filters);
  }, [searchParams]);


  const [selections, setSelections] = useState<Selections>({
    profile: null,
    installExtension: false,
    startInteracting: false,
  });

  const [isProfileSelectionComplete, setIsProfileSelectionComplete] = useState(false);

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
    return null; 
  }

  const handleSelection = (category: keyof Selections, selectedItem: Data | null) => {
    if (category === 'profile') {
      setSelections((prev) => {
        // Create a new object to avoid mutating the previous state
        const newSelections: Selections = { ...prev };
        
        // Explicitly set the profile property
        if (selectedItem) {
          newSelections.profile = selectedItem._id;
        } else {
          newSelections.profile = null;
        }
  
        return newSelections;
      });
  
      setIsProfileSelectionComplete(!!selectedItem);
    }
  };

  const renderStep = (icon: React.ElementType, title: string, description: string, action: React.ReactNode, isComplete: boolean) => (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-4 bg-gray-50 rounded-t-lg">
        <div className="bg-blue-100 p-3 rounded-full">
          {React.createElement(icon, { className: "h-8 w-8 text-blue-600" })}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {isComplete && (
          <div className="ml-auto">
            <Image
              src="/assets/icons/checkMark.svg"
              alt="Completed"
              width={64}
              height={64}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription className="text-gray-700 text-lg mb-6">
          {description}
        </CardDescription>
        {action}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col mt-3">
      <main className="flex-grow container mx-auto py-16 px-4">
        <section className="text-center mb-24 relative">
          <div className="absolute inset-0 -z-10">
            <Image src="/hero-background.jpg" layout="fill" objectFit="cover" alt="AI background" />
          </div>
          <div className="bg-white bg-opacity-90 py-12 px-6 rounded-lg shadow-lg">
            <h1 className="text-6xl font-bold mb-6 text-gray-900">Quick Start</h1>
            <p className="text-2xl text-gray-700 mb-12 max-w-2xl mx-auto">
              Browse, Select, and Interact with AI in less than 60 seconds
            </p>
          </div>
        </section>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {renderStep(
            User,
            "Select a Profile",
            "Find and select a profile that matches your interests and needs.",
            <Button
              onClick={() => setOpenStep(openStep === "profile" ? null : "profile")}
              variant="outline"
              className="w-full"
            >
              Choose Profile
            </Button>,
            isProfileSelectionComplete
          )}

          {renderStep(
            Chrome,
            "Install Extension",
            "Install the Juno Browser Extension for effortless AI interaction.",
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>,
            selections.installExtension
          )}

          {renderStep(
            Play,
            "Start Interacting",
            "Begin interacting with your chosen profile instantly and effortlessly.",
            <Button variant="outline" className="w-full" disabled={!isProfileSelectionComplete}>
              Start Interaction
            </Button>,
            selections.startInteracting
          )}
        </div>

        {openStep === "profile" && (
          <div className="mt-12">
            <LibraryPage
              contextType="QuickStart"
              libraryType="Profiles"
              h2Text="Select a Profile"
              pText="Find and select a profile that matches your interests and needs."
              user={userDetails}
              onReload={handleReload}
              activeFilters={activeFilters}
              onSelect={(selectedItem) => handleSelection("profile", selectedItem)}
              selectedCardId={selections.profile}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default QuickStart;