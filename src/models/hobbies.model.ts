import { Schema, model, Document } from 'mongoose';

export interface IHobby extends Document {
  passionLevel: string;
  name: string;
  year: number;
}

const hobbySchema = new Schema<IHobby>({
  passionLevel: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
});

export default model<IHobby>('Hobby', hobbySchema);
