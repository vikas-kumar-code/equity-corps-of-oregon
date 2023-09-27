import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

export async function GET(request, data) {
  let records = {};
  let response = {};

  try {
    const session = await getSession();
    const case_id = parseInt(data.params.id);
    let where = { case_id };

    // if user is admin then show all invoices
    // Do not show draft invoices
    if (session.user.role_id === 1) {
      where = { ...where, status: { gte: 1 } };

      // Show only user's invoices
    } else {
      where = { ...where, user_id: session.user.id };
    }

    records.case_invoices = await prisma.case_invoices.findMany({
      where,
      orderBy: [{ id: "desc" }],
      include: {
        user: {
          select: {
            name: true,
            email: true,
            address: true,
          },
        },
        payments: true,
      },
    });

    records.case = await prisma.cases.findUnique({
      where: {
        id: case_id,
      },
    });

    if (records.case && records.case_invoices) {
      response.records = records;
      response.success = true;      
    } else {
      response.error = true;
      response.message = 'Records not found.';
    }

  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
