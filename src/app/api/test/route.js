import sendMail from "@/utils/sendMail";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  return NextResponse.json({
    success: await sendMail({
      to: "vishalkumarmx@gmail.com",
      subject: "Testing mail service",
      text: "Hello Vishal, How are you?",
    }),
  });
}
