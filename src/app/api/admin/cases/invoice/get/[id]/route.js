import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request, data) {
  let response = {};
  try {
    const record = await prisma.case_invoices.findUnique({
      where: {
        id: parseInt(data.params.id),
      },
    });

    if (record) {
      response.success = true;
      response.record = {
        ...record,
        due_on: "", //record.due_on,
        particulars: await JSON.parse(record.particulars),
      };
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
