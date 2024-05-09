"use server";
import { connectToDB } from "@/db/database";
import Form from "@/db/models/formDocument";

export async function getUserForms(userId: string) {
  if (!userId) {
    return [];
  }
  try {
    await connectToDB();
    const forms = await Form.find({ userId: userId });
    return forms;
  } catch (error) {
    console.error("Error getting user forms.", error);
  }
}
