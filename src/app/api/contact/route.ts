import { NextRequest, NextResponse } from "next/server";
import type { ContactPayload } from "@/lib/types";

// POST /api/contact -> handle contact form submissions
// Swap the console.log below for an email service (Resend, Nodemailer, etc.)
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  console.log("New contact message:", body);

  return NextResponse.json(
    { success: true, message: "Thanks! Your message has been received." },
    { status: 200 }
  );
}
