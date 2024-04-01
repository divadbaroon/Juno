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

import { Separator } from "@/components/ui/separator";

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
  onReload: () => void;
  models: string[];
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
  onReload,
  models,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State hooks to show sections
  const [showDetails, setShowDetails] = useState(false);
  const [showExampleUsage, setShowExampleUsage] = useState(false);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

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
              <div className="mb-4">
                <h3
                  className="text-lg font-bold mb-2 cursor-pointer"
                  onClick={() => setShowDetails(!showDetails)}
                >Card Details
                </h3>
                <Separator className="my-0" />

                {showDetails && (
                  <div className="border border-gray-300 rounded p-2">
                    <ul className="list-disc pl-4">
                      {models.map((model, index) => (
                        <li key={index}>{model}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h3
                  className="text-lg font-bold mb-2 cursor-pointer"
                  onClick={() => setShowExampleUsage(!showExampleUsage)}
                >
                  Example Usage
                </h3>
                <Separator className="my-0" />

                {showExampleUsage && (
                  <div className="border border-gray-300 rounded p-2">
                    {/* Dropdown content with example usage */}
                    <p>Example usage content goes here.</p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h3
                  className="text-lg font-bold mb-2 cursor-pointer"
                  onClick={() => setShowSetupInstructions(!showSetupInstructions)}
                >
                  Setup Instructions
                </h3>
                <Separator className="my-0" />

                {showSetupInstructions && (
                  <div className="border border-gray-300 rounded p-2">
                    {/* Step-by-step setup instructions */}
                    <p>There is no setup for this extension.</p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h3
                  className="text-lg font-bold mb-2 cursor-pointer"
                  onClick={() => setShowCode(!showCode)}
                >
                  Code
                </h3>
                <Separator className="my-0" />

                {showCode && (
                  <div className="border border-gray-300 rounded p-2">
                    {/* Code snippets or examples */}
                    <p>Code snippets or examples go here.</p>
                  </div>
                )}
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-2 cursor-pointer"
                  onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                >
                  Preferences
                </h3>
                <Separator className="my-0" />
                {showAdditionalInfo && (
                  <div className="border border-gray-300 rounded p-2">
                    {/* Any other relevant information */}
                    <p>Additional information goes here.</p>
                  </div>
                )}
              </div>
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