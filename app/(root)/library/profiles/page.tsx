"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { redirect, useSearchParams } from 'next/navigation';
import { getUserById } from "@/lib/actions/user.actions";
import { LibraryPage } from "@/components/shared/library/LibraryPage"
import LibraryHeader from '@/components/shared/library/LibraryHeader'
import LibraryTabNavigation from '@/components/shared/library/LibraryTabNavigation'
import { Separator } from "@/components/ui/separator";

export default function ProfileLibraryPage() {
    const { user, isSignedIn, isLoaded } = useUser();
    const [userDetails, setUserDetails] = useState<any>(null);
    const [reloadCounter, setReloadCounter] = useState(0);
    const searchParams = useSearchParams();
    const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});

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

    useEffect(() => {
        // Process URL parameters
        const filters: {[key: string]: string} = {};
        searchParams.forEach((value, key) => {
            filters[key] = value;
        });
        
        setActiveFilters(filters);

    }, [searchParams]);

    const handleReload = () => {
        setReloadCounter((prev) => prev + 1); 
    };

    if (!userDetails) {
        return null; 
    }
    
    return (
        <div className="root-container p-8">
             
            <LibraryHeader />

            <Separator className="my-8" /> 

            <div className="mb-8"> 
                <LibraryTabNavigation />
            </div>

            <Separator className="my-8" /> 

            <LibraryPage 
                contextType="Library"
                libraryType="Profiles" 
                h2Text="Profiles"
                pText="Explore pre-configured profiles, powered by Large Language Models, lifelike voices, and unique capabilities. 
                    Select a profile that resonates, and refine it to match your needs." 
                user={userDetails}
                onReload={handleReload}
                activeFilters={activeFilters}
            />
        </div>
    );
}