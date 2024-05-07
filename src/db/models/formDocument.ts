import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for Form
interface FormDocument extends Document {
  name?: string;
  description?: string;
  userId?: string;
  published?: boolean;
}

const formSchema = new Schema<FormDocument>({
  name: String,
  description: String,
  userId: String,
  published: Boolean,
});

// Define relations for form
formSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "formId",
});

formSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

formSchema.virtual("submissions", {
  ref: "FormSubmission",
  localField: "_id",
  foreignField: "formId",
});

// Populate the virtual fields when querying forms
// include them in response but they are not stored in db
formSchema.set("toObject", { virtuals: true });
formSchema.set("toJSON", { virtuals: true });

const Form = mongoose.model<FormDocument>("Form", formSchema);
export default Form;
