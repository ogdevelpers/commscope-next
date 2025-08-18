export const runtime = "edge";
import { getConfirmationEmailTemplate } from "@/lib/getTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Correct mail format
    const { data, error } = await resend.emails.send({
      from: "mail.commscope.msdplus.com",
      to: [email],
      subject: "Thank you for registering!",
      html: getConfirmationEmailTemplate(name),
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
