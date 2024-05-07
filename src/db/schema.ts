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

// Mongoose schema for accounts
interface Account extends Document {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

const accountSchema = new Schema<Account>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

const Account = mongoose.model<Account>("Account", accountSchema);

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

// Mongoose schema for verification token
interface VerificationTokenDocument extends Document {
  identifier: string;
  token: string;
  expires: Date;
}

const verificationTokenSchema = new Schema<VerificationTokenDocument>({
  identifier: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

// Define compound key for the schema
verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const VerificationToken = mongoose.model<VerificationTokenDocument>(
  "VerificationToken",
  verificationTokenSchema
);

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

const Form = mongoose.model<FormDocument>("Form", formSchema);

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
formSchema.set("toObject", { virtuals: true });
formSchema.set("toJSON", { virtuals: true });

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

const Question = mongoose.model<QuestionDocument>("Question", questionSchema);

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
questionSchema.set("toObject", { virtuals: true });
questionSchema.set("toJSON", { virtuals: true });

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

const fieldOption = mongoose.model<FieldOptionDocument>(
  "FieldOption",
  fieldOptionSchema
);

// Define relations between FieldOption and Question
fieldOptionSchema.virtual("question", {
  ref: "Question",
  localField: "questionId",
  foreignField: "_id",
});
// Populate the virtual field when querying fieldOptions
fieldOptionSchema.set("toObject", { virtuals: true });
fieldOptionSchema.set("toJSON", { virtuals: true });

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

const Answer = mongoose.model<AnswerDocument>("Answer", answerSchema);

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
answerSchema.set("toObject", { virtuals: true });
answerSchema.set("toJSON", { virtuals: true });

// Mongoose schema for field options
interface FieldOptionDocument extends Document {
  text?: string;
  value?: string;
  questionId?: number;
}

// Mongoose schema for  form submissions
interface FormSubmissionDocument extends Document {
  formId?: number;
}

const formSubmissionSchema = new Schema<FormSubmissionDocument>({
  formId: Number,
});

const FormSubmission = mongoose.model<FormSubmissionDocument>(
  "FormSubmission",
  formSubmissionSchema
);

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

formSubmissionSchema.set("toObject", { virtuals: true });
formSubmissionSchema.set("toJSON", { virtuals: true });

export {
  User,
  Account,
  Session,
  VerificationToken,
  Form,
  Question,
  fieldOption,
  Answer,
  FormSubmission,
};
