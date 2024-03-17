import { Document, Schema, model, models } from "mongoose";

export interface IExtensions extends Document {
  name: string;  
  creator: string;
  description: string;
  sharePreference: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ExtensionSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  sharePreference: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Extension = models?.Extension || model('Extension', ExtensionSchema);

export default Extension;
