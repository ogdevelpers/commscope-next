export const runtime = 'edge';
import { ThankYouSection } from "@/components/ThankYou/ThankYou";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend"; 
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json(); 

    const { data, error } = await resend.emails.send({
      from: "CommScope <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for registering!",
      html: "<div>Thank you for registering</div>",
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}