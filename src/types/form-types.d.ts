type FormDocument = {
  _id: {
    $oid: string;
  };
  name?: string;
  description?: string;
  userId?: string;
  published?: boolean;
};

type Question = {
  _id: {
    $oid: string;
  };
  text?: string;
  fieldType?: string;
  formId?: string;
};

type FieldOption = {
  _id: {
    $oid: string;
  };
  text?: string;
  value?: string;
  questionId?: string;
};

type QuestionWithOptionsModel = Question & {
  fieldOptions: Array<FieldOption>;
};

type FormModel = FormDocument & {
  questions: Array<QuestionWithOptionsModel>;
};
