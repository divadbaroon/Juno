import React from 'react';
import { LibraryPage } from "@/components/shared/library/LibraryPage";

  interface VoiceData {
    _id: string;
  }
  
  interface VoicesSelectionProps {
    userDetails: User;
    onReload: () => void;
    onSelect: (selectedExtension: VoiceData | null) => void;
    selectedVoiceId: string | null;
  }

const VoiceSelection: React.FC<VoicesSelectionProps> = ({ 
    userDetails, 
    onReload, 
    onSelect, 
    selectedVoiceId
    }) => {
  return (
    <LibraryPage
      contextType="Lab"
      libraryType="Voices"
      h2Text=""
      pText="Choose a unique voice that complements your AI's personality and enhances the user experience."
      user={userDetails}
      onReload={onReload}
      onSelect={onSelect}
      selectedCardId={selectedVoiceId}
    />
  );
};

export default VoiceSelection;