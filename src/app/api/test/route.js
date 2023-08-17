import { NextResponse } from "next/server";
import sendMail from "@/utils/sendMail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getSession } from "@/utils/serverHelpers";



export async function GET(request, data) {
  try {
    // const mail = sendMail({
    //   to: "vishalkumarmx@gmail.com",
    //   templateId: 1,
    //   modelsData:{
    //     users:{
    //       name:'Vishal Kumar'
    //     }
    //   }
    // });
    const session = await getSession();
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
