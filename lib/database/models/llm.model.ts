import { Document, Schema, model, models } from "mongoose";

export interface ILLM extends Document {
  name: string;  
  creator: string;
  description: string;
  sharePreference: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LLMSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  sharePreference: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const LLM = models?.LLM || model('LLM', LLMSchema);

export default LLM;
