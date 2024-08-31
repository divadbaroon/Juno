import React from 'react';
import { LibraryPage } from "@/components/shared/library/LibraryPage";

  interface PromptData {
    _id: string;
  }
  
  interface PromptSelectionProps {
    contextType: string
    userDetails: User;
    onReload: () => void;
    onSelect: (selectedExtension: PromptData | null) => void;
    selectedPromptId: string | null;
  }

const PromptSelection: React.FC<PromptSelectionProps> = ({ 
    contextType,
    userDetails, 
    onReload, 
    onSelect, 
    selectedPromptId
    }) => {
  return (
    <LibraryPage
    contextType={contextType}
    libraryType="Prompts" 
    h2Text="Prompts" 
    pText="Personalize your AI's voice from a wide range of lifelike options, enhancing communication with styles from warm and friendly to formal and authoritative."
    user={userDetails}
    onReload={onReload}
    onSelect={onSelect}
    selectedCardId={selectedPromptId}
    />
  );
};

export default PromptSelection;