import { ThankYouSection } from "@/components/ThankYou/ThankYou";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToString } from "react-dom/server";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Render the ThankYou component to HTML string
    const emailHtml = renderToString(
      React.createElement(ThankYouSection, { name })
    );

    const { data, error } = await resend.emails.send({
      from: "CommScope <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for registering!",
      html: emailHtml,
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
