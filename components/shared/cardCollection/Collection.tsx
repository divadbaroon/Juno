"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search } from '../Search';
import { Separator } from "@/components/ui/separator";
import { formUrlQuery } from '@/lib/utils';
import DisplayCard from './DisplayCard';
import { useToast } from "@/components/ui/use-toast";

import { updateUserCollection, removeFromUserCollection } from '@/lib/actions/user.actions';

interface User {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string | null;
  lastName: string | null;
  usageLeft: number;
  __v: number;
  plan: string;
  userCollection: {
    profiles: string[];
    llms: string[];
    voices: string[];
    extensions: string[];
  };
}

interface Data {
  _id: string;
  name: string;
  creator: string;
  description: string;
  sharePreference: string;
  createdAt: string;
  updatedAt: string;
  objectURL?: string;
  photo?: string;
  link?: string;
}

export const Collection: React.FC<{ userDetails: User, contextType: string; type: string; totalPages?: number; page: number; hasSearch?: boolean; items: Data[]; onReload: () => void; onSelect?: (selectedItem: Data | null) => void; selectedCardId?: string | string[] | null;}> = ({ userDetails, hasSearch = false, totalPages = 1, contextType, type, page, items, onReload, onSelect, selectedCardId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Delay the display of the spinner by 2 seconds
    const timeoutId = setTimeout(() => {
      setShowSpinner(true);
    }, 2000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to run the effect only once

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? page + 1 : page - 1;
    const newUrl = formUrlQuery({ searchParams: searchParams.toString(), key: "page", value: pageValue, });
    router.push(newUrl, { scroll: false });
  };

  const isCardInCollection = (cardId: string) => {
    if (type === 'LLMs') {
      return userDetails.userCollection.llms.includes(cardId);
    } else if (type === 'Voices') {
      return userDetails.userCollection.voices.includes(cardId);
    } else if (type === 'Extensions') {
      return userDetails.userCollection.extensions.includes(cardId);
    } else if (type === 'Profiles') {
      return userDetails.userCollection.profiles.includes(cardId);
    }
    
    return false;
  };

  const handleCardSelect = async (cardId: string) => {
    const isSelected = selectedCard === cardId;
    setSelectedCard((prevSelectedCard) => (prevSelectedCard === cardId ? null : cardId));

    const selectedItem = items.find((item) => item._id === cardId);

    // Deselection case
    if (isSelected) {
      if (onSelect) onSelect(null); 
      return; 
    }

    if (!isSelected) {
      if (selectedItem) {
        if (onSelect) {
          onSelect(selectedItem);
        }
        if (contextType === 'Dashboard') {
          try {
            const updateResult = await removeFromUserCollection(userDetails.clerkId, {
              profiles: type === 'CollectionProfiles' ? [selectedItem._id] : [],
              llms: type === 'CollectionLLMs' ? [selectedItem._id] : [],
              voices: type === 'CollectionVoices' ? [selectedItem._id] : [],
              extensions: type === 'CollectionExtensions' ? [selectedItem._id] : [],
            });
            toast({
              title: `${selectedItem.name} has been removed`,
              description: (
                <span>
                  See your updated collection in your{' '}
                  <a href="/myCollection" className="underline">
                  collection
                  </a>
                </span>
              )
            });
            onReload();
          } catch (error) {
            console.error('Failed to remove from user collection:', error);
          }
        } else if (contextType === 'Library') {
          if (isCardInCollection(cardId)) {
            try {
              const updateResult = await removeFromUserCollection(userDetails.clerkId, {
                profiles: type === 'Profiles' ? [selectedItem._id] : [],
                llms: type === 'LLMs' ? [selectedItem._id] : [],
                voices: type === 'Voices' ? [selectedItem._id] : [],
                extensions: type === 'Extensions' ? [selectedItem._id] : [],
              });
              toast({
                title: `${selectedItem.name} has been removed`,
                description: (
                  <span>
                    See your updated collection in your{' '}
                    <a href="/myCollection" className="underline">
                    collection
                    </a>
                  </span>
                )
              });
              onReload();
            } catch (error) {
              console.error('Failed to remove from user collection:', error);
            }
          } else {
            try {
      
              const updateResult = await updateUserCollection(userDetails.clerkId, {
                profiles: type === 'Profiles' ? [selectedItem._id] : [],
                llms: type === 'LLMs' ? [selectedItem._id] : [],
                voices: type === 'Voices' ? [selectedItem._id] : [],
                extensions: type === 'Extensions' ? [selectedItem._id] : [],
              });
              toast({
                title: `${selectedItem.name} has been saved`,
                description: (
                  <span>
                    See your saved component in your{' '}
                    <a href="/myCollection" className="underline">
                      collection
                    </a>
                  </span>
                )
              });
              onReload();
            } catch (error) {
              console.error('Failed to update user collection:', error);
            }
          }
        }
      }
    }
  };

  return (
    <>
      <div className="collection-heading">
        <h2 className="collection-heading__title"></h2>
        {hasSearch && <Search />}
      </div>
      <Separator className="collection-separator mb-5" />
      {items.length > 0 ? (
        <ul className="collection-list" style={{ maxHeight: contextType === 'Library' ? '750px' : '500px' }}>
         {items.map((item) => ( // Here, item represents the current item object in the iteration
            <li key={item._id}>
              <DisplayCard
                clerkId={userDetails.clerkId}
                contextType={contextType}
                type={type}
                title={item.name}
                creator={item.creator}
                description={item.description}
                isSelected={item._id === selectedCardId}
                onSelect={() => handleCardSelect(item._id)}
                userCollection={userDetails.userCollection}
                isInCollection={contextType === 'Dashboard' || isCardInCollection(item._id)}
                onReload={onReload}
                models={['Model 1', 'Model 2', 'Model 3']}
                blobURL={item.objectURL}
                photo={item.photo}
                link={item.link}
                allItems={item} 
              />
            </li>
          ))}
        </ul>
      ) : (
        // Adjusted spinner for visibility
        <div className="collection-empty">
          {showSpinner && (
            <div className="rounded-full h-20 w-20 bg-[#334155] animate-ping-slow"></div>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination className="collection-pagination">
          <PaginationContent className="collection-pagination__content">
            <Button disabled={page <= 1} className="collection-pagination__button" onClick={() => onPageChange("prev")}>
              <PaginationPrevious className="collection-pagination__button-icon" />
            </Button>
            <p className="collection-pagination__info">
              {page} / {totalPages}
            </p>
            <Button className="collection-pagination__button" onClick={() => onPageChange("next")} disabled={page >= totalPages}>
              <PaginationNext className="collection-pagination__button-icon" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};