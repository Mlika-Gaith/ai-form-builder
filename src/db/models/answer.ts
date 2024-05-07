import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for answers
interface AnswerDocument extends Document {
  value?: string;
  questionId?: number;
  formSubmissionId?: number;
  fieldOptionsId?: number;
}

const answerSchema = new Schema<AnswerDocument>({
  value: String,
  questionId: Number,
  formSubmissionId: Number,
  fieldOptionsId: Number,
});

// Define answers relations with other entities
answerSchema.virtual("question", {
  ref: "Question",
  localField: "questionId",
  foreignField: "_id",
});

answerSchema.virtual("formSubmission", {
  ref: "FormSubmission",
  localField: "FormSubmissionId",
  foreignField: "_id",
});

answerSchema.virtual("fieldOption", {
  ref: "FieldOption",
  localField: "fieldOptionsId",
  foreignField: "_id",
});

// Populate the virtual fields when querying answers
// Include in response but they are not stored in db
answerSchema.set("toObject", { virtuals: true });
answerSchema.set("toJSON", { virtuals: true });

const Answer = mongoose.model<AnswerDocument>("Answer", answerSchema);
export default Answer;
