"use server";

import { connectToDB } from "@/db/database";
import Form from "@/db/models/formDocument";
require("@/db/models/question");
require("@/db/models/fieldOption");
require("@/db/models/answer");
require("@/db/models/formSubmission");

const getFormResults = async (formId: string) => {
  try {
    await connectToDB();
    const form = await Form.findById(formId)
      .populate({
        path: "questions",
        populate: {
          path: "fieldOptions",
        },
      })
      .populate({
        path: "submissions",
        populate: {
          path: "answers",
          populate: {
            path: "fieldOption",
          },
        },
      })
      .exec();
    return JSON.parse(JSON.stringify(form));
  } catch (error) {
    console.error("Error getting form results.", error);
    return null;
  }
};

export default getFormResults;
