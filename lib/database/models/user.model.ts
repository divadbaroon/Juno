import { Schema, model, models, Types } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  plan: {
    type: String,
    default: "Trial",
  },
  usageLeft: {
    type: Number,
    default: 900,
  },
  lastUsed: {
    type: Date,
  }, 
  userCollection: {
    profiles: Array,
    llms: Array,
    voices: Array,
    extensions: Array,
    prompts: Array
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
