import { Resend } from "resend";

export const STUDIO_EMAIL = "mivialabcanada@gmail.com";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  website?: string;
  service?: string;
  project: string;
};

export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "MiviaLab <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("Contact email is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `MiviaLab project inquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company ? `Company: ${payload.company}` : null,
      payload.website ? `Website: ${payload.website}` : null,
      payload.service ? `Service: ${payload.service}` : null,
      "",
      "Project description:",
      payload.project,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });

  if (error) {
    throw new Error(error.message || "Failed to send email");
  }
}
