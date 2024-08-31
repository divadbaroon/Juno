"use client"

import React, { useState, useEffect } from 'react';
import { Search, Download, MessageSquare, ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { redirect, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { LibraryPage } from "@/components/shared/library/LibraryPage";
import { useUser } from '@clerk/clerk-react';
import { getUserById } from "@/lib/actions/user.actions";
import { Separator } from "@/components/ui/separator"


export default function QuickStartPage() {
  const [openStep, setOpenStep] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [selections, setSelections] = useState({
    profile: null,
    installExtension: false,
    startInteracting: false,
  });
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});

  const toggleStep = (key: string) => {
    setOpenStep(prevOpenStep => prevOpenStep === key ? null : key);
  };

  useEffect(() => {
    // Process URL parameters
    const filters: {[key: string]: string} = {};
    searchParams.forEach((value, key) => {
        filters[key] = value;
    });
    
    setActiveFilters(filters);

}, [searchParams]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

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

  const handleSelection = (category: string, selectedItem: any) => {
    setSelections(prev => ({
      ...prev,
      [category]: selectedItem ? selectedItem._id : null,
    }));
  };

  const steps = [
    {
      title: "Get Started",
      description: "Find and select a profile that matches your interests and needs.",
      action: "Select a Profile",
      icon: <Search className="w-6 h-6" />,
      key: "profile",
      content: (
        <LibraryPage
          contextType="QuickStart"
          libraryType="Profiles"
          h2Text=""
          pText="Profiles are pre-configured AIs designed to provide unique capabilities. Each profile combines a large language model with tailored instructions, a distinctive voice, and specific functionalities to suit your needs."
          user={userDetails}
          onReload={handleReload}
          onSelect={(selectedItem) => handleSelection("profile", selectedItem)}
          selectedCardId={selections.profile}
          activeFilters={activeFilters}
        />
      )
    },
    {
      title: "Integrate",
      description: "Install the Juno Browser Extension for effortless AI interaction within your browser.",
      action: "Install the Juno Browser Extension",
      icon: <Download className="w-6 h-6" />,
      key: "installExtension",
      content: <div className="p-4">Coming soon...</div>
    },
    {
      title: "Interact",
      description: "Begin interacting with your chosen profile instantly and effortlessly.",
      action: "Start Interacting",
      icon: <MessageSquare className="w-6 h-6" />,
      key: "startInteracting",
      content: (
        <p className="p-4 text-gray-600">
          Press the hotkey you designated in the Juno Chrome Extension and speak.
        </p>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px'}}>
        Quick Start
      </h4>
      <p className="p-20-regular text-dark-400" style={{ marginTop: '15px', marginLeft: '3px' }}>
        Browse, Select, and Interact with AI in less than 60 seconds
      </p>
    
      <Separator className="my-4" />

      <div className="space-y-6 mt-5">
        {steps.map((step, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => toggleStep(step.key)}
              >
                <div className="flex items-center">
                  <div className="mr-4">{step.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold">{step.title}</h2>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <ChevronDown className={`transition-transform duration-200 ${openStep === step.key ? 'transform rotate-180' : ''}`} />
              </div>
              {openStep === step.key ? (
                <div className="p-6 border-t">{step.content}</div>
              ) : (
                <div className="px-6 pb-6">
                  <Button 
                    className="w-full text-white"
                    onClick={() => toggleStep(step.key)}
                  >
                    {step.action}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}