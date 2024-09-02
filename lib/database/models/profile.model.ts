import { Document, Schema, model, models } from "mongoose";

export interface IProfile extends Document {
  creator: string;
  llm: string;
  name: string;
  description: string;
  voice: string;
  extensions: string[];
  sharePreference: string;
  photo?: string;
  prompt: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  index?: number;
}

const ProfileSchema = new Schema({
  creator: { type: String, required: true },
  llm: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  voice: { type: String, required: true },
  extensions: [{ type: String }],
  sharePreference: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  index: { type: Number, required: true },
});

const Profile = models?.Profile || model('Profile', ProfileSchema);

export default Profile;