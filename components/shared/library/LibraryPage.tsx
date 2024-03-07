import React, { useState } from 'react';

import { Collection } from "@/components/shared/Collection"
import { Separator } from "@/components/ui/separator";

interface ProfilesProps {
    h2Text: string;
    pText: string;
  }

export const LibraryPage = ({ h2Text, pText }: ProfilesProps) => {
    // Placeholder values for the Collection component
    const [images, setImages] = useState({ data: [] }); // Set images to an empty array
    const totalPages = 0; // Placeholder for total pages
    const page = 1; // Placeholder for current page

    return (
      <div>
         <div className="section">
            <h2 className="h2-bold text-dark-600" style={{ marginTop: '35px' }}>{h2Text}</h2>
            <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>{pText}</p>
            <Separator className="my-4" />
        </div>
        <section className="sm:mt-12">
            <Collection 
            hasSearch={true}
            images={images?.data}
            totalPages={totalPages}
            page={page}
            tab ={"Profiles"}
            />
        </section>
      </div>
    )
  }