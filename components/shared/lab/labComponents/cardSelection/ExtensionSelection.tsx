import React from 'react';
import { LibraryPage } from "@/components/shared/library/LibraryPage";

interface ExtensionData {
  _id: string;
}

interface ExtensionsSelectionProps {
  userDetails: User;
  onReload: () => void;
  onSelect: (selectedExtension: ExtensionData | null) => void;
  selectedExtensionId: string | null;
}

const ExtensionsSelection: React.FC<ExtensionsSelectionProps> = ({ 
  userDetails, 
  onReload, 
  onSelect, 
  selectedExtensionId 
}) => {
  return (
    <LibraryPage
      contextType="Lab"
      libraryType="Extensions"
      h2Text=""
      pText="Enhance your AI's capabilities by adding powerful extensions and functionalities."
      user={userDetails}
      onReload={onReload}
      onSelect={onSelect}
      selectedCardId={selectedExtensionId}
    />
  );
};

export default ExtensionsSelection;