import React, { useEffect, useState } from 'react';
import { Collection } from "@/components/shared/Collection";
import { Separator } from "@/components/ui/separator";
import { getAllLLMs } from "@/lib/actions/fetchLLMData.actions";
import { getAllVoices } from "@/lib/actions/fetchVoiceData.action";
import { getAllExtensions } from "@/lib/actions/fetchExtensionData.action";

interface UserDetails {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string | null;
  lastName: string | null;
  usageLeft: number;
  plan: string;
  userCollection: {
    llms: string[];
    voices: string[];
    extensions: string[];
  };
  __v: number;
}

interface ProfilesProps {
  user: UserDetails;
  contextType: string;
  libraryType: string;
  h2Text: string;
  pText: string;
  onReload: () => void;
  onSelect?: (selectedItem: Data) => void; 
  selectedCardId?: string | string[] | null;
}

interface Data {
  _id: string;
  name: string;
  creator: string;
  description: string;
  sharePreference: string;
  createdAt: string;
  updatedAt: string;
}

const fetchDataByType = async (user: UserDetails, libraryType: string): Promise<Data[]> => {
  switch (libraryType) {
    case "LLMs":
      return await getAllLLMs();
    case "Voices":
      return await getAllVoices();
    case "Extensions":
      return await getAllExtensions();
    case "CollectionLLMs":
      const llms = await getAllLLMs();
      return llms.filter((llm: Data) => user.userCollection.llms.includes(llm._id));
    case "CollectionVoices":
      const voices = await getAllVoices();
      return voices.filter((voice: Data) => user.userCollection.voices.includes(voice._id));
    case "CollectionExtensions":
      const extensions = await getAllExtensions();
      return extensions.filter((extension: Data) => user.userCollection.extensions.includes(extension._id));
    default:
      return [];
  }
};

export const LibraryPage = ({ user, contextType, libraryType, h2Text, pText, onReload, onSelect, selectedCardId }: ProfilesProps) => {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchDataByType(user, libraryType);
      setData(fetchedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [libraryType, user]);

  return (
    <div>
      <div className="section">
        <h2 className="h2-bold text-dark-600" style={{ marginTop: contextType === 'Library' ? '25px' : '15px' }}>{h2Text}</h2>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px' }}>{pText}</p>
        <Separator className="my-4" />
      </div>
      <section className="sm:mt-12">
        <Collection
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