import React, { useEffect, useState } from 'react';

// ui components
import { Separator } from "@/components/ui/separator";

// Used to fetch card data
import { getAllProfiles } from "@/lib/actions/fetchProfileData.action";
import { getAllLLMs } from "@/lib/actions/fetchLLMData.actions";
import { getAllVoices } from "@/lib/actions/fetchVoiceData.action";
import { getAllExtensions } from "@/lib/actions/fetchExtensionData.action";
import { getAllPrompts } from "@/lib/actions/fetchPromptData.action";

// Creates and displays a collection of cards
import { CardCollection } from "@/components/shared/cards/CardCollection";

// Used for filtering 
import Fuse from 'fuse.js';

/*
Fetches appropriate card data based on specified type such as profiles, llms, prompts, ect.
*/
const fetchDataByType = async (user: User, libraryType: string, activeFilters: { [key: string]: string }): Promise<Data[]> => {
  let fetchedData: Data[];

  switch (libraryType) {
    case "Profiles":
      fetchedData = await getAllProfiles();
      break;
    case "LLMs":
      fetchedData = await getAllLLMs();
      break;
    case "Prompts":
      fetchedData = await getAllPrompts();
      break;
    case "Voices":
      fetchedData = await getAllVoices();
      break;
    case "Extensions":
      fetchedData = await getAllExtensions();
      break;
    case "CollectionProfiles":
      const allProfiles = await getAllProfiles();
      fetchedData = allProfiles.filter((profile: Data) => user.userCollection.profiles.includes(profile._id));
      break;
    case "CollectionLLMs":
      const llms = await getAllLLMs();
      fetchedData = llms.filter((llm: Data) => user.userCollection.llms.includes(llm._id));
      break;
    case "CollectionVoices":
      const voices = await getAllVoices();
      fetchedData = voices.filter((voice: Data) => user.userCollection.voices.includes(voice._id));
      break;
    case "CollectionExtensions":
      const extensions = await getAllExtensions();
      fetchedData = extensions.filter((extension: Data) => user.userCollection.extensions.includes(extension._id));
      break;
    default:
      fetchedData = [];
  }
  if (activeFilters)
  {
    // Apply filters and search
    if (Object.keys(activeFilters).length > 0) {
      // Check if 'query' is in activeFilters
      const queryFilter = activeFilters['query'];
      
      if (queryFilter) {
        // Apply Fuse.js search
        const fuse = new Fuse(fetchedData, {
          keys: ['name', 'description'],
          includeScore: true,
          threshold: 0.4 // Adjust this value to make the search more or less strict
        });

        const searchResults = fuse.search(queryFilter);
        fetchedData = searchResults.map(result => result.item);
      }

      // Apply other filters
      fetchedData = fetchedData.filter((item: Data) => {
        return Object.entries(activeFilters).every(([key, value]) => {
          if (key === 'query') return true; // Skip 'query' as it's already handled
          if (!item.tags) return false;
          return item.tags.some((tag: string) => {
            const [tagKey, tagValue] = tag.split(': ');
            return tagKey === key && (value === '' || tagValue === value);
          });
        });
      });
    }
  }

  // Sort the fetchedData by index in ascending order
  return fetchedData.sort((a, b) => (a.index || 0) - (b.index || 0));
};

/*
Fetches appropriate card data based on specified type and loads in a collection of cards using the data
*/
export const LibraryPage = ({ user, contextType, libraryType, h2Text, pText, onReload, activeFilters, onSelect, selectedCardId }: ProfilesProps) => {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchDataByType(user, libraryType, activeFilters || {});
      setData(fetchedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [libraryType, user, activeFilters]); 

  return (
    <div>
      <div className="section">
        <h2 className="h2-bold text-dark-600" style={{ marginTop: contextType === 'Library' ? '25px' : '-5px' , marginLeft: '0px'}}>{h2Text}</h2>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px' }}>{pText}</p>
        <Separator className="my-4" />
      </div>
      <section className="sm:mt-12">
        <CardCollection
          userDetails={user}
          contextType={contextType}
          type={libraryType}
          hasSearch={true}
          totalPages={0}
          page={1}
          items={data}
          onReload={onReload}
          onSelect={onSelect}
          selectedCardId={selectedCardId}
        />
      </section>
    </div>
  );
};