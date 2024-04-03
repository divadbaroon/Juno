import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import DetailsSection from '@/components/shared/DetailsSection';

interface DisplayCardProps {
  clerkId: string; // Clerk ID of the user viewing the card
  contextType: string;
  type: string;
  title: string;
  creator: string;
  blobURL?: string;
  link?: string;
  description: string;
  photo?: string;
  isSelected: boolean;
  onSelect: () => void;
  userCollection: {
    llms: string[];
    voices: string[];
    extensions: string[];
  };
  isInCollection: boolean;
  additionalInfo?: string;
  onReload: () => void;
  models: string[];
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  clerkId,
  contextType,
  type,
  title,
  creator,
  blobURL,
  link,
  description,
  photo,
  isSelected,
  onSelect,
  userCollection,
  isInCollection,
  additionalInfo,
  onReload,
  models,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [cardTitle, setTitle] = useState(title);
  const [cardDescription, setDescription] = useState(description);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const borderClass =
    isSelected && contextType === 'QuickStart'
      ? 'border-4 border-indigo-200 border-t-indigo-500'
      : '';

  const handleSelect = () => {
    onSelect();
    onReload(); // Call onReload after onSelect is called
  };

  const handleUpdateDetails = (updatedDetails: { title: string; description: string }) => {
    setTitle(updatedDetails.title);
    setDescription(updatedDetails.description);
  };

  const playAudioSample = () => {
  if (blobURL) {
    // Stop the currently playing audio, if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create a new audio element and play the selected audio
    const audio = new Audio(blobURL);
    audioRef.current = audio;
    audio.play().catch(error => console.error("Error playing the audio:", error));
  }
};

  return (
    <Card className={`${borderClass}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{creator}</CardDescription>
      </CardHeader>
      <CardContent>
        {photo && (
          <div className="card__photo">
            <img src={photo} alt={title} className="card__photo-image" />
          </div>
        )}
        <p className="card__description">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center items-center space-x-10">
        {type === 'Voices' ? (
          <Button className="w-auto px-8" variant="outline" onClick={playAudioSample}>
          Sample
        </Button>
        ) : (
          <Button className="w-auto px-8" variant="outline" onClick={openModal}>
            Details
          </Button>
        )}
        <Button className="w-auto px-8" onClick={handleSelect}>
          {contextType === 'QuickStart' && type === 'Extensions'
            ? isSelected
              ? 'Unadd'
              : 'Add'
            : contextType === 'Dashboard'
            ? isInCollection
              ? 'Remove'
              : 'Save'
            : contextType === 'Library'
            ? isInCollection
              ? 'Saved'
              : 'Save'
            : isSelected
            ? 'Deselect'
            : 'Select'}
        </Button>
      </CardFooter>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <div className="flex">
            <div className="w-1/2 pr-4">
              <Card className="collection-card">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{creator}</CardDescription>
                </CardHeader>
                <CardContent>
                  {photo && (
                    <div className="card__photo">
                      <img src={photo} alt={title} className="card__photo-image" />
                    </div>
                  )}
                  <p className="card__description">{description}</p>
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2 pl-4">
            <DetailsSection
                type={type}
                models={models}
                title={cardTitle}
                creator={creator}
                description={cardDescription}
                link={link}
                onUpdateDetails={handleUpdateDetails}
              />   
             </div>          
          </div>
          <DialogFooter>
            <Button onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DisplayCard;