import { Document, Schema, model, models } from "mongoose";

export interface IProfile extends Document {
  name: string;
  description: string;
  llm: string;
  personality: string;
  identity: string;
  interactionGuidelines: string;
  voice: string;
  extensions: string[];
  sharePreference: string;
  photo?: string;
  context: string;
  temperature: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  llm: { type: String, required: true },
  personality: { type: String, required: true },
  identity: { type: String, required: true },
  interactionGuidelines: { type: String, required: true },
  voice: { type: String, required: true },
  extensions: [{ type: String }],
  sharePreference: { type: String, required: true },
  photo: { type: String },
  context: { type: String, required: true },
  temperature: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Profile = models?.Profile || model('Profile', ProfileSchema);

export default Profile;