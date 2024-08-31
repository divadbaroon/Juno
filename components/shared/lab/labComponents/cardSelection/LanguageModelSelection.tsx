import React from 'react';
import { LibraryPage } from "@/components/shared/library/LibraryPage";

interface SelectedLLM {
  _id: string;
}

interface LanguageModelSelectionProps {
  userDetails: User;
  onModelSelect: (modelId: string | null) => void;
  selectedLLM: string | null;
}

export const LanguageModelSelection: React.FC<LanguageModelSelectionProps> = ({ 
  userDetails, 
  onModelSelect,
  selectedLLM
}) => {
  const handleLLMSelect = (selectedLLM: SelectedLLM | null) => {
    onModelSelect(selectedLLM ? selectedLLM._id : null);
  };

  const handleReload = () => {
    // Implement reload logic if needed
  };

  return (
    <LibraryPage
      contextType="Lab"
      libraryType="LLMs"
      h2Text=""
      pText="Select the language model that will power your AI's natural language understanding and generation."
      user={userDetails}
      onReload={handleReload}
      onSelect={handleLLMSelect}
      selectedCardId={selectedLLM}
    />
  );
};