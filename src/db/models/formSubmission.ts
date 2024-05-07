import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for  form submissions
interface FormSubmissionDocument extends Document {
  formId?: number;
}

const formSubmissionSchema = new Schema<FormSubmissionDocument>({
  formId: Number,
});

// Define form submissions relations
formSubmissionSchema.virtual("form", {
  ref: "Form",
  localField: "formId",
  foreignField: "_id",
});

formSubmissionSchema.virtual("answers", {
  ref: "Answer",
  localField: "_id",
  foreignField: "formSubmissionId",
});
// Populate the virtual field when querying formSubmissions
// Include in response but they are not stored in db
formSubmissionSchema.set("toObject", { virtuals: true });
formSubmissionSchema.set("toJSON", { virtuals: true });

const FormSubmission = mongoose.model<FormSubmissionDocument>(
  "FormSubmission",
  formSubmissionSchema
);
export default FormSubmission;
