import React, { useState } from 'react';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DisplayCardProps {
  clerkId: string; // Clerk ID of the user viewing the card
  contextType: string;
  type: string;
  title: string;
  creator: string;
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
  onReload: () => void; // Add the onReload prop
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  clerkId,
  contextType,
  type,
  title,
  creator,
  description,
  photo,
  isSelected,
  onSelect,
  userCollection,
  isInCollection,
  additionalInfo,
  onReload, // Add onReload to the destructured props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <Button className="w-auto px-8" variant="outline">
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
              ? 'Remove'
              : 'Save'
            : isSelected
            ? 'Deselect'
            : 'Select'}
        </Button>
      </CardFooter>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{additionalInfo}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DisplayCard;