import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  hobbies: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
});

export default model<IUser>('User', userSchema);
