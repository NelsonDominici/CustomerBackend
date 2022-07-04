import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  //permissions: { type: Number, required: true },
});

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
}
