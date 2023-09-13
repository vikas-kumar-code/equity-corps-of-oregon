import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { invoiceSchema } from "@/joi/casesSchema";
import { getSession } from "@/utils/serverHelpers";

export async function PUT(request, data) {
  let response = {};
  try {
    const session = await getSession();
    let req = await request.json();
    const id = parseInt(data.params.id);
    const validated = await validateAsync(invoiceSchema, req?.particulars, {
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
        if (caseInvoice.status <= 1) {
          let total_amount = 0;
          validated.forEach((item) => {
            total_amount += parseFloat(item.amount);
          });
          total_amount = parseFloat(total_amount.toFixed(2));
          let particulars = JSON.stringify(validated);
          const caseInvoiceModel = await prisma.case_invoices.update({
            where: { id, user_id: session.user.id },
            data: {
              particulars,
              total_amount,
            },
          });
          if (caseInvoiceModel) {
            await prisma.logs.create({
              data: {
                case_id: caseInvoiceModel.case_id,
                content:
                  caseInvoiceModel.name +
                  " updated by " +
                  session.user.name +
                  ".",
              },
            });
            response.success = true;
            response.message = "Invoice updated successfully.";
          } else {
            response.error = true;
            response.message = "Something went wrong. please try again.";
          }
        } else {
          response.error = true;
          response.message = "You can not perform this action.";
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
