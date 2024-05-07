import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for users
interface User extends Document {
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  stripeCustomerId?: string;
  subscribed?: boolean;
}

const userSchema = new Schema<User>({
  name: String,
  email: { type: String, required: true },
  emailVerified: Date,
  image: String,
  stripeCustomerId: String,
  subscribed: Boolean,
});

const User = mongoose.model<User>("User", userSchema);

export default User;
