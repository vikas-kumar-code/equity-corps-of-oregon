import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { invoiceSchema } from "@/joi/casesSchema";
import { getSession } from "@/utils/serverHelpers";

export async function POST(request) {
  let response = {};
  try {
    const session = await getSession();
    const user_id = session.user.id;
    let data = await request.json();
    const validated = await validateAsync(invoiceSchema, data?.particulars, {
      errorKey: true,
    });
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const case_id = data.case_id;
      let total_amount = 0;
      validated.forEach((item) => {
        total_amount += parseFloat(item.amount);
      });
      total_amount = parseFloat(total_amount.toFixed(2));      
      let particulars = JSON.stringify(validated);

      const caseInvoiceModel = await prisma.case_invoices.create({
        data: {
          case_id,
          user_id,
          particulars,
          total_amount,
        },
      });
      if (caseInvoiceModel) {
        response.success = true;
        response.message = "Invoice added successfully.";
      } else {
        response.error = true;
        response.message = "Something went wrong. please try again.";
      }
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
