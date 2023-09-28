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
    const validated = await validateAsync(invoiceSchema, req);
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const caseInvoice = await prisma.case_invoices.findUnique({
        where: { id, user_id: session.user.id },
      });
      const caseModel = await prisma.cases.findUnique({
        where: { id: caseInvoice.case_id },
      });
      if (caseInvoice && caseModel) {
        if (caseInvoice.status === 0) {
          let total_amount = 0;
          validated.particulars.forEach((item, index) => {
            total_amount += Number(item.amount);
            validated.particulars[index].amount = Number(
              item.amount.toFixed(2)
            );
          });
          total_amount = Number(total_amount.toFixed(2));
          let particulars = JSON.stringify(validated.particulars);

          const caseInvoices = await prisma.case_invoices.findMany({
            where: {
              case_id: caseModel.id,
              user_id: session.user.id,
              NOT: {
                id: id,
              },
            },
          });

             
          let allInvoiceAmout = total_amount;
          if (caseInvoices) {
            caseInvoices.forEach((item) => {
              allInvoiceAmout += Number(item.total_amount);
            });            
          }

          if (allInvoiceAmout <= caseModel.maximum_compensation) {
            const caseInvoiceModel = await prisma.case_invoices.update({
              where: { id, user_id: session.user.id },
              data: {
                particulars,
                total_amount,
                due_on: validated.due_on,
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
              response.id = caseInvoiceModel.id;
            } else {
              response.error = true;
              response.message = "Something went wrong. please try again.";
            }
          } else {
            response.error = true;
            response.message =
              "The total amount of all invoices cannot exceed the maximum compensation amount."
          }
        } else {
          response.error = true;
          response.message = "Only draft invoices can be edited.";
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
