import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

export async function GET(request, data) {
  let response = {};
  let record = {};
  try {
    const session = await getSession();
    const id = parseInt(data.params.id);
    let where = { id };

    // Get invoice preview data
    if (id === 0) {
      record.admin = await prisma.users.findUnique({
        where: {
          id: 1,
        },
        select: {
          name: true,
          email: true,
          address: true,
          law_firm_name: true,
        },
      });

      // record.case_invoice = await prisma.case_invoices.findUnique({
      //   where:{
      //     user_id: session.user.id
      //   }
      // });
      // record.case = await prisma.cases.findUnique({
      //   where: {
      //     id: record.case_invoice.case_id,
      //   },
      // });

      response.success = true;
      response.record = record;
    } else {
      // Get user's invoice only if user is not admin
      if (session.user.role_id !== 1) {
        where = { ...where, user_id: session.user.id };
      }

      record.case_invoice = await prisma.case_invoices.findUnique({
        where,
      });

      record.case = await prisma.cases.findUnique({
        where: {
          id: record.case_invoice.case_id,
        },
      });

      record.admin = await prisma.users.findUnique({
        where: {
          id: 1,
        },
        select: {
          name: true,
          email: true,
          address: true,
          law_firm_name: true,
        },
      });

      if (record.case_invoice && record.case && record.admin) {
        record.case_invoice = {
          ...record.case_invoice,
          particulars: JSON.parse(record.case_invoice.particulars),
          files: record.case_invoice.files
            ? JSON.parse(record.case_invoice.files)
            : [],
          temp_files: [],
        };
        response.success = true;
        response.record = record;
      } else {
        response.error = true;
        response.message = "Record not found.";
      }
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
