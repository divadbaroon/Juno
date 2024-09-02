import { Document, Schema, model, models } from "mongoose";

export interface IVoice extends Document {
  name: string;  
  creator: string;
  description: string;
  sharePreference: string;
  voiceId: string;
  objectURL: string;
  createdAt?: Date;
  updatedAt?: Date;
  index?: number;
}

const VoiceSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  sharePreference: { type: String, required: true },
  voiceId: { type: String, required: true },
  objectURL: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  index: { type: Number, required: true },
});


const Voice = models?.Voice || model('Voice', VoiceSchema);

export default Voice;
