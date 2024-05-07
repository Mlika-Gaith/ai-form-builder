import mongoose, { Schema, Document } from "mongoose";

// Mongoose Schema for questions
interface QuestionDocument extends Document {
  text?: string;
  fieldType?: string;
  formId?: number;
}
const questionSchema = new Schema<QuestionDocument>({
  text: String,
  fieldType: String,
  formId: Number,
});

// Define relations for questions
questionSchema.virtual("form", {
  ref: "Form",
  localField: "formId",
  foreignField: "_id",
});

questionSchema.virtual("fieldOptions", {
  ref: "FieldOption",
  localField: "_id",
  foreignField: "questionId",
});

questionSchema.virtual("answers", {
  ref: "Answer",
  localField: "_id",
  foreignField: "questionId",
});

// Populate the virtual fields when querying questions
// Include them in response but they are not stored in db
questionSchema.set("toObject", { virtuals: true });
questionSchema.set("toJSON", { virtuals: true });

const Question = mongoose.model<QuestionDocument>("Question", questionSchema);
export default Question;
