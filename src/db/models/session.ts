import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for sessions
interface SessionDocument extends Document {
  sessionToken: string;
  userId: string;
  expires: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  expires: { type: Date, required: true },
});

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);
export default Session;
