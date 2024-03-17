import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DisplayCardProps {
  type: string;
  title: string;
  creator: string;
  description: string;
  photo?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ type, title, creator, description, photo, isSelected, onSelect }) => {
  return (
    <div> 
      <Card className={`${isSelected ? 'border-4 border-indigo-200 border-t-indigo-500' : ''}`}>
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
        <CardFooter className="flex justify-center items-center space-x-6">
          {type === 'Voices' && <Button className="w-auto px-8" variant="outline">Sample</Button>}
          <Button className="w-auto px-8" onClick={onSelect}>
            {isSelected ? 'Deselect' : 'Select'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DisplayCard;