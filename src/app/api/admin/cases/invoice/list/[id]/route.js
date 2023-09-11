import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

export async function GET(request, data) {
  let records = [];
  let response = {};
  try {
    const session = await getSession();
    records = await prisma.case_invoices.findMany({
      where: {
        case_id: parseInt(data.params.id),
        user_id: session.user.id,
      },
      orderBy: [{ id: "desc" }],
    });
    // output response
    response.success = true;
    response.message = "Case invoices";
    response.records = records;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
