import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { invoiceSchema } from "@/joi/casesSchema";
import { getSession } from "@/utils/serverHelpers";

export async function PUT(request) {
  let response = {};
  try {
    const session = await getSession();
    let data = await request.json();
    const id = parseInt(data.params.id);
    const validated = await validateAsync(invoiceSchema, data, {
      errorKey: true,
    });
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const caseInvoice = prisma.case_invoices.findUnique({
        where: { id, user_id: session.user.id },
      });
      if (caseInvoice) {
        let total_amount = 0;
        validated.particulars.forEach((item) => {
          total_amount += Number(item.amount).toFixed(2);
        });
        let particulars = JSON.stringify(validated.particulars);
        const caseInvoiceModel = await prisma.case_invoices.update({
          where: { id, user_id: session.user.id },
          data: {
            particulars,
            total_amount,
          },
        });
        if (caseInvoiceModel) {
          response.success = true;
          response.message = "Invoice updated successfully.";
        } else {
          response.error = true;
          response.message = "Something went wrong. please try again.";
        }
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
