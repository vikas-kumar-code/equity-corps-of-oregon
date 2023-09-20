import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { invoicePaymentSchema } from "@/joi/casesSchema";
import { getSession } from "@/utils/serverHelpers";
import common from "@/utils/common";

export async function POST(request, data) {
  let response = {};
  try {
    const session = await getSession();
    let req = await request.json();
    const id = parseInt(data.params.id);

    const validated = await validateAsync(invoicePaymentSchema, req, {
      stripUnknown: true,
    });
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      const caseInvoice = await prisma.case_invoices.findUnique({
        where: { id },
        include: {
          case: true,
          user: true,
          payments: true,
        },
      });

      let paidAmount = 0;
      if (caseInvoice.payments && caseInvoice.payments.length > 0) {
        const allPayments = caseInvoice.payments.map((item) => item.amount);
        paidAmount = allPayments.reduce(
          (total, amount) => total + Number(amount),
          0
        );
      }

      if (caseInvoice) {
        if (caseInvoice.status <= 2) {
          if (caseInvoice.total_amount >= paidAmount + validated.total_amount) {
            await prisma.$transaction(async (tx) => {
              const addPayment = await tx.payments.create({
                data: {
                  case_invoice_id: caseInvoice.id,
                  user_id: caseInvoice.user_id,
                  amount: validated.total_amount,
                },
              });
              if (addPayment) {
                //   3 = Full Paid
                //   2 = Partially Paid
                
                const statusIs =
                  caseInvoice.total_amount ==
                  (paidAmount + validated.total_amount)
                    ? 3
                    : 2;
                    
                const updateInvoice = await tx.case_invoices.update({
                  where: {
                    id: caseInvoice.id,
                  },
                  data: {
                    status: statusIs,
                  },
                });

                if (updateInvoice) {
                  response.success = true;
                  response.message = "Payment added successfully.";
                } else {
                  response.error = true;
                  response.message = "Something went wrong. please try again.";
                }
              } else {
                response.error = true;
                response.message = "Something went wrong. please try again.";
              }
            });
          } else {
            response.error = true;
            response.message = {
              total_amount:
                "Due amount is " +
                common.currencyFormat(
                  caseInvoice.total_amount - paidAmount,
                  2
                ),
            };
          }
        } else {
          response.error = true;
          response.message = "No due payment found.";
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
