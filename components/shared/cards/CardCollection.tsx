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

// import { updateUserCollection, removeFromUserCollection } from '@/lib/actions/user.actions';

import Filter from '@/components/shared/filter'

export const CardCollection: React.FC<{ userDetails: User, contextType: string; type: string; totalPages?: number; page: number; hasSearch?: boolean; items: Data[]; onReload: () => void; onSelect?: (selectedItem: Data | null) => void; selectedCardId?: string | string[] | null;}> = ({ userDetails, hasSearch = false, totalPages = 1, contextType, type, page, items, onReload, onSelect, selectedCardId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSpinner(true);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []); 

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? page + 1 : page - 1;
    const newUrl = formUrlQuery({ searchParams: searchParams.toString(), key: "page", value: pageValue, });
    router.push(newUrl, { scroll: false });
  };

  const handleCardSelect = (cardId: string) => {
    const isSelected = selectedCard === cardId;
    setSelectedCard((prevSelectedCard) => (prevSelectedCard === cardId ? null : cardId));

    // If there's a callback for selection, call it
    if (onSelect) {
      const selectedItem = items.find((item) => item._id === cardId);
      onSelect(isSelected ? null : selectedItem || null);
    }
  };

  return (
    <>
      <div className="collection-heading flex items-center space-x-4">
        <Filter contextType={"Library"} cardType={type}/>
        {hasSearch && <Search />}
      </div>
      <Separator className="collection-separator mb-5" />
      {items.length > 0 ? (
        <ul className="collection-list" style={{ maxHeight: contextType === 'Library' ? '750px' : '500px', overflowY: 'auto'  }}>
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
                isInCollection={false}
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