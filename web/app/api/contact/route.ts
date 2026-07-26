import { NextResponse } from "next/server";
import { isContactConfigured, sendContactEmail, STUDIO_EMAIL } from "@/lib/mail";

type Body = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  project?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asOptionalString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = asOptionalString(body.name);
  const email = asOptionalString(body.email);
  const company = asOptionalString(body.company);
  const project = asOptionalString(body.project);

  if (!name || !isValidEmail(email) || !project) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and project description." },
      { status: 400 },
    );
  }

  if (
    name.length > 200 ||
    email.length > 320 ||
    company.length > 200 ||
    project.length > 5000
  ) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (!isContactConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] Dev stub. Email not sent:", {
        name,
        email,
        company,
        project,
      });
      return NextResponse.json({
        ok: true,
        stub: true,
        message: "Dev stub: contact received (RESEND_API_KEY / CONTACT_TO_EMAIL not set).",
      });
    }

    return NextResponse.json(
      { error: `Contact form is not configured yet. Please email ${STUDIO_EMAIL}.` },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail({ name, email, company, project });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: `Could not send your message. Please try again or email ${STUDIO_EMAIL}.` },
      { status: 502 },
    );
  }
}
