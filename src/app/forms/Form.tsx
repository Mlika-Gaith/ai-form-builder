import {
  Form as FormComponent,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField as MyFormField } from "./FormField";
import { publishForm } from "../actions/mutateForm";

type Props = {
  form: FormModel;
  editMode?: boolean;
};

const Form = (props: Props) => {
  const form = useForm();
  const router = useRouter();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const handleDialogChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  };
  const onSubmit = async (data: any) => {
    console.log(data);
    if (props.editMode) {
      //await publishForm(props.form?._id);
      setSuccessDialogOpen(true);
    } else {
      let answers = [];
      for (const [questionId, value] of Object.entries(data)) {
        const id = parseInt(questionId.replace("question_", ""));
        let fieldOptionsId = null;
        let textValue = null;
        if (typeof value == "string" && value.includes("answerId_")) {
          fieldOptionsId = parseInt(value.replace("answerId_", ""));
        } else {
          textValue = value as string;
        }
        answers.push({ questionId: id, fieldOptionsId, value: textValue });
      }
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/form/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId: props.form._id, answers }),
      });
      if (response.status === 200) {
        router.push(`/forms/${props.form._id}/success`);
      } else {
        console.error("Error submitting form");
        alert("Error submitting form. Please try again later");
      }
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-lg font-bold py-3">{props.form.name}</h1>
      <h3 className="text-md">{props.form.description}</h3>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FormComponent {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full max-w-3xl items-center gap-6 my-4 text-left"
          >
            {props.form.questions.map(
              (question: QuestionWithOptionsModel, index: number) => {
                return (
                  <FormField
                    control={form.control}
                    name={`question_${question._id}`}
                    key={`${question.text}_${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base mt-3">
                          {index + 1}. {question.text}
                        </FormLabel>
                        <FormControl>
                          <MyFormField
                            element={question}
                            key={index}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                );
              }
            )}
          </form>
        </FormComponent>
      </main>
    </div>
  );
};

export default Form;
