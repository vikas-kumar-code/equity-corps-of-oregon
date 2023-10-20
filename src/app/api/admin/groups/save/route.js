import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  try {
    let data = await request.json();
    if (data?.name) {
      const createGroup = await prisma.groups.create({
        data: {
          name: data.name,
          description: data?.description || "",
        },
      });
      if (createGroup) {
        response.success = true;
        response.message = "A new group added successfully.";
      } else {
        response.error = true;
        response.message = "Something went wrong. please try again.";
      }
    } else {
      response.error = true;
      response.message = "Group name can not be empty.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
