import { Document, Schema, model, models } from "mongoose";

export interface ICODE extends Document {
  code: number;
  usesLeft: number;
  plan: string;
}

const CODESchema = new Schema({
  code: { type: Number, required: true },
  usesLeft: { type: Number, required: true },
  plan: { type: String, required: true }
});

const Code = models?.CODE || model<ICODE>('CODE', CODESchema);

export default Code;