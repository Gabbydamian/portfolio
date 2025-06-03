"use server";

import { sendEmail } from "@/lib/email-service";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const result = await sendEmail(formData);
    return { success: result.success };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return { success: false, error: "Failed to send message" };
  }
}
