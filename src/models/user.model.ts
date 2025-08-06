import mongoose, { Document, Schema } from 'mongoose';

export type Role = 'agent' | 'hospital';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  hospital?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['agent', 'hospital'], required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Only if role = 'agent'
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
