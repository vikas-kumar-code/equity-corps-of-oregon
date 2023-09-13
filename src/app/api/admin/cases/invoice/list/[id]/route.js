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
      include: {
        case: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });

    const admin = await prisma.users.findUnique({
      where: {
        id: 1,
      },
      select:{
        name: true,        
        email: true,
        address: true,
        law_firm_name: true,      
      }
    });

    // output response
    response.success = true;
    response.message = "Case invoices";
    response.records = records;
    response.admin = admin;
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
