import { NextResponse } from "next/server";
import sendMail from "@/utils/sendMail";

export async function GET(request, data) {
  try {
    const mail = sendMail({
      to: "vishalkumarmx@gmail.com",
      templateId: 1,
      modelsData:{
        users:{
          name:'Vishal Kumar'
        }
      }
    });
    return NextResponse.json({
      success: mail ? 'Sent' : 'Failed',
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
