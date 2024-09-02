import { Document, Schema, model, models } from "mongoose";

export interface IPrompt extends Document {
  name: string;  
  creator: string;
  description: string;
  sharePreference: string;
  personality: string;
  context: string;
  interactionGuidelines: string;
  background: string;
  temperature: number;
  tags: string[]; 
  createdAt?: Date;
  updatedAt?: Date;
  index?: number;
}

const PromptSchema = new Schema<IPrompt>({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  sharePreference: { type: String, required: true },
  personality: { type: String, required: true },
  context: { type: String, required: true },
  interactionGuidelines: { type: String, required: true },
  background: { type: String, required: true },
  temperature: { type: Number, required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  index: { type: Number, required: true },
});

const Prompt = models?.Prompt || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;