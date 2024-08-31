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
import DetailsSection from '@/components/shared/cards/DetailsSection';

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
  allItems,
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
    isSelected && (contextType === 'QuickStart' || contextType == 'Lab')
      ? 'selected-card'
      : 'non-selected-card';

  const handleSelect = () => {
    onSelect();
    onReload(); 
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

  const renderButtonLabel = () => {
    if (contextType === 'QuickStart' && type === 'Extensions') {
      return isSelected ? 'Unadd' : 'Add';
    }
    if (contextType === 'Dashboard') {
      return isInCollection ? 'Remove' : 'Save';
    }
    if (contextType === 'Library') {
      return isInCollection ? 'Saved' : 'Save';
    }
    return isSelected ? 'Deselect' : 'Select';
  };

  return (
    <>
    <Card className={`${borderClass}`}>
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{creator}</CardDescription>
      </CardHeader>
      <CardContent>
      <p className="card__description" style={{ marginTop: '0px' }}>{description}</p>

      </CardContent>
      <CardFooter className="card-footer flex justify-center items-center space-x-10 -mb-.5">
        {type === 'Voices' ? (
          <Button className="w-24 px-8" variant="outline" onClick={playAudioSample}>
          Sample
        </Button>
        ) : (
          <Button className="w-24 px-8" variant="outline" onClick={openModal}>
            Details
          </Button>
        )}
        <Button className="w-24 px-8" onClick={handleSelect}>
          {renderButtonLabel()}
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
                  <p className="card__description" style={{ marginTop: '-30px' }}>{description}</p>
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
                allItems = {allItems}
              />   
             </div>          
          </div>
          <DialogFooter>
            <Button onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  </>
  );
};

export default DisplayCard;