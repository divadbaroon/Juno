import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface FieldProps {
  value: string | number;
  onChange: (value: string | number) => void;
  showExample: boolean;
  exampleText: string;
  onFileUpload?: (file: File) => void;  
}

const ContextField: React.FC<FieldProps> = ({ value, onChange, showExample, exampleText }) => (
  <FormField
    name="context"
    render={() => (
      <FormItem>
        <FormLabel className="font-bold" style={{ color: '#373737' }}>Context</FormLabel>
        <FormDescription style={{ marginTop: '.1rem' }}>
          Define the core purpose, setting, and general context for your AI.
        </FormDescription>
        <FormControl>
          <Input
            placeholder={showExample ? exampleText : ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

const BackgroundField: React.FC<FieldProps> = ({ value, onChange, showExample, exampleText, onFileUpload }) => (
  <FormField
    name="background"
    render={() => (
      <FormItem>
        <FormLabel className="font-bold" style={{ color: '#373737' }}>Background Information</FormLabel>
        <FormDescription style={{ marginTop: '.1rem' }}>
          Provide specific historical or situational details via text or file that inform the AI's responses.
        </FormDescription>
        <FormControl>
          <Input
            placeholder={showExample ? exampleText : ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormControl>

        {onFileUpload && (
          <div className="mt-2">
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileUpload(file);
              }}
            />
          </div>
        )}
      </FormItem>
    )}
  />
);

const PersonalityField: React.FC<FieldProps> = ({ value, onChange, showExample, exampleText }) => (
  <FormField
    name="personality"
    render={() => (
      <FormItem>
        <FormLabel className="font-bold" style={{ color: '#373737' }}>Personality Traits</FormLabel>
        <FormDescription style={{ marginTop: '.1rem' }}>
          Define the personality traits of your AI.
        </FormDescription>
        <FormControl>
          <Input
            placeholder={showExample ? exampleText : ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

const InteractionGuidelinesField: React.FC<FieldProps> = ({ value, onChange, showExample, exampleText }) => (
  <FormField
    name="interactionGuidelines"
    render={() => (
      <FormItem>
        <FormLabel className="font-bold" style={{ color: '#373737' }}>Interaction Style</FormLabel>
        <FormDescription style={{ marginTop: '.1rem' }}>
          Set guidelines on how your AI communicates with you
        </FormDescription>
        <FormControl>
          <Input
            placeholder={showExample ? exampleText : ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

const TemperatureField: React.FC<FieldProps> = ({ value, onChange, showExample }) => (
  <FormField
    name="temperature"
    render={() => (
      <FormItem>
        <FormLabel className="font-bold" style={{ color: '#373737' }}>Temperature Control</FormLabel>
        <FormDescription style={{ marginTop: '.1rem' }}>
        Adjust the balance between predictability and creativity in the LLM's responses.
        </FormDescription>
        <FormControl>
          <Slider
            defaultValue={[value as number]}
            max={100}
            step={1}
            onValueChange={(newValue) => onChange(newValue[0])}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export { ContextField, BackgroundField, PersonalityField, InteractionGuidelinesField, TemperatureField };