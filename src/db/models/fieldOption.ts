import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for field options
interface FieldOptionDocument extends Document {
  text?: string;
  value?: string;
  questionId?: number;
}

const fieldOptionSchema = new Schema<FieldOptionDocument>({
  text: String,
  value: String,
  questionId: Number,
});

// Define relations between FieldOption and Question
fieldOptionSchema.virtual("question", {
  ref: "Question",
  localField: "questionId",
  foreignField: "_id",
});

// Populate the virtual field when querying fieldOptions
// Include in response but they are not stored in db
fieldOptionSchema.set("toObject", { virtuals: true });
fieldOptionSchema.set("toJSON", { virtuals: true });

const FieldOption = mongoose.model<FieldOptionDocument>(
  "FieldOption",
  fieldOptionSchema
);
export default FieldOption;
