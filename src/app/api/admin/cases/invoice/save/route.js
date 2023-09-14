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
    const validated = await validateAsync(invoiceSchema, data);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const case_id = data.case_id;
      const due_on = data.due_on;
      let total_amount = 0;
      validated.particulars.forEach((item) => {
        total_amount += parseFloat(item.amount);
      });
      total_amount = parseFloat(total_amount.toFixed(2));
      let particulars = JSON.stringify(validated.particulars);

      await prisma.$transaction(async (tx) => {
        const caseModel = await tx.cases.findUnique({
          where: { id: case_id },
        });
        if (caseModel) {
          const caseInvoiceModel = await tx.case_invoices.create({
            data: {
              case_id,
              user_id,
              particulars,              
              total_amount,
              due_on,
            },
          });
          if (caseInvoiceModel) {
            const invoice = await tx.case_invoices.update({
              where: { id: caseInvoiceModel.id },
              data: {
                name:
                  "Invoice-" +
                  caseModel.case_number +
                  "-" +
                  caseInvoiceModel.id,
              },
            });
            await tx.logs.create({
              data: {
                case_id,
                content: invoice.name + " added by " + session.user.name + ".",
              },
            });
            response.success = true;
            response.message = "Invoice added successfully.";
          }
        }
      });
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
