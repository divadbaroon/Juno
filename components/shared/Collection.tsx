"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search } from './Search';
import { Separator } from "@/components/ui/separator";
import { formUrlQuery } from '@/lib/utils';
import DisplayCard from './DisaplayCard';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";

interface Data {
  _id: string;
  name: string;
  creator: string;
  description: string;
  sharePreference: string;
  createdAt: string;
  updatedAt: string;
}

export const Collection: React.FC<{ contextType: string; type: string; totalPages?: number; page: number; hasSearch?: boolean; items: Data[]; }> = ({ hasSearch = false, totalPages = 1, contextType, type, page, items }) => {
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

  const handleCardSelect = (cardId: string) => {
    const isSelected = selectedCard === cardId;
    setSelectedCard((prevSelectedCard) => (prevSelectedCard === cardId ? null : cardId));

    if (!isSelected && contextType === 'Library') {
      const selectedItem = items.find((item) => item._id === cardId);
      if (selectedItem) {
        toast({
          title: `${selectedItem.name} has been saved`,
          description: (
            <span>
              See your saved component in your{' '}
              <a href="/dashboard" className="underline">
                dashboard
              </a>
            </span>
          )
        });
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
        <ul className="collection-list" style={{ maxHeight: contextType === 'Library' ? '750px' : '500px', overflowY: 'auto' }}>
          {items.map(({ _id, name, creator, description }) => (
            <li key={_id}>
              <DisplayCard 
              contextType={contextType} 
              type={type} title={name}
              creator={creator} 
              description={description} 
              isSelected={selectedCard === _id} 
              onSelect={() => handleCardSelect(_id)} />
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