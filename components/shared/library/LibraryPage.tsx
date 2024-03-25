import React, { useEffect, useState } from 'react';
import { Collection } from "@/components/shared/Collection";
import { Separator } from "@/components/ui/separator";
import { getAllLLMs } from "@/lib/actions/fetchLLMData.actions";
import { getAllVoices } from "@/lib/actions/fetchVoiceData.action";
import { getAllExtensions } from "@/lib/actions/fetchExtensionData.action";

interface ProfilesProps {
  contextType: string;
  libraryType: string;
  h2Text: string;
  pText: string;
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

const fetchDataByType = async (libraryType: string): Promise<Data[]> => {
  switch (libraryType) {
    case "LLMs":
      return await getAllLLMs();
    case "Voices":
      return await getAllVoices();
    case "Extensions":
      return await getAllExtensions();
    default:
      return [];
  }
};

export const LibraryPage = ({ contextType, libraryType, h2Text, pText }: ProfilesProps) => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchDataByType(libraryType);
        setData(fetchedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [libraryType]);

  return (
    <div>
      <div className="section">
        <h2 className="h2-bold text-dark-600" style={{ marginTop: contextType === 'Library' ? '25px' : '15px' }}>{h2Text}</h2>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px', marginLeft: '5px'}}>{pText}</p>
        <Separator className="my-4" />
      </div>
      <section className="sm:mt-12">
        <Collection contextType={contextType} type={libraryType} hasSearch={true} totalPages={0} page={1} items={data} />
      </section>
    </div>
  );
};
