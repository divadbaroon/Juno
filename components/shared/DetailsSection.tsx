import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";

interface DetailsSectionProps {
  models: string[];
  type: string;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ models, type }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showExampleUsage, setShowExampleUsage] = useState(false);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  return (
    <div>
      {/* Details section */}
      <div className="mb-4">
        <h3
          className="text-lg font-bold mb-2 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          Card Details
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
      {/* Conditionally render sections based on contextType */}
      {type === 'Extensions' && (
        <>
          {/* Example Usage section */}
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
                <p>Example usage content goes here.</p>
              </div>
            )}
          </div>

          {/* Setup Instructions section */}
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
                <p>There is no setup for this extension.</p>
              </div>
            )}
          </div>

          {/* Code section */}
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
                <p>Code snippets or examples go here.</p>
              </div>
            )}
          </div>

          {/* Preferences section */}
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
                <p>Additional information goes here.</p>
              </div>
            )}
          </div>
        </>
      )}

      {type === 'LLMs' && (
        <>
          {/* Performance section */}
          <div className="mb-4">
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowPerformance(!showPerformance)}
            >
              Performance
            </h3>
            <Separator className="my-0" />
            {showPerformance && (
              <div className="border border-gray-300 rounded p-2">
                <p>Performance information goes here.</p>
              </div>
            )}
          </div>

          {/* Background section */}
          <div>
            <h3
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setShowBackground(!showBackground)}
            >
              Background
            </h3>
            <Separator className="my-0" />
            {showBackground && (
              <div className="border border-gray-300 rounded p-2">
                <p>Background information goes here.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsSection;