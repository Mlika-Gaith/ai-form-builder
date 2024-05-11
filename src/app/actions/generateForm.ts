"use server";

import { connectToDB } from "@/db/database";
import { PROMPT_EXPLANATION } from "@/utils/prompt-explanation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import Form from "@/db/models/formDocument";
import OpenAI from "openai";
import Question from "@/db/models/question";
import FieldOption from "@/db/models/fieldOption";

type GenerateFormFunction = (
  prevState: { message: string; data?: any },
  formData: FormData
) => Promise<{ message: string; data?: any } | undefined>;

export const generateForm: GenerateFormFunction = async (
  prevState: { message: string },
  formData: FormData
) => {
  const schema = z.object({ description: z.string().min(1) });
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.error(parse.error);
    return { message: "Failed to parse data." };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      message: "NO OpenAI API key found.",
    };
  }

  const data = parse.data;
  const promptExplanation = PROMPT_EXPLANATION;

  const openai = new OpenAI({
    apiKey: "anything",
    baseURL: "http://localhost:3040/v1",
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: `${data.description} ${promptExplanation}` },
    ],
    model: "gpt-3.5-turbo",
  });
  const content = chatCompletion.choices[0].message.content;
  const jsonStartIndex = content?.indexOf("{");
  const jsonEndIndex = content?.lastIndexOf("}");
  //@ts-ignore
  const jsonString = content?.substring(jsonStartIndex, jsonEndIndex + 1);
  //@ts-ignore
  const surveyObject = JSON.parse(jsonString);
  try {
    const newForm = new Form({
      name: surveyObject.name,
      description: surveyObject.description,
      questions: surveyObject.questions,
    });
    await connectToDB();
    await newForm.save();

    for (const questionData of surveyObject.questions) {
      const question = new Question({
        text: questionData.text,
        fieldType: questionData.fieldType,
        formId: newForm._id, // Reference to the saved form
      });
      await question.save();
      // Save field options
      for (const fieldOptionData of questionData.fieldOptions) {
        await FieldOption.create({
          text: fieldOptionData.text,
          value: fieldOptionData.value,
          questionId: question._id, // Reference to the saved question
        });
      }
    }
    const newFormObj = newForm.toObject();
    console.log(newFormObj);
    const formId = newFormObj._id.toString();
    revalidatePath("/");
    return {
      message: "success",
      data: { formId: formId },
    };
  } catch (error) {
    console.error("Error saving new Form.");
    return {
      message: "error",
    };
  }
};
