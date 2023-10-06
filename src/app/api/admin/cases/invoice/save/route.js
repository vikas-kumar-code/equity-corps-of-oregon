import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession, moveFile } from "@/utils/serverHelpers";
import invoiceValidation from "@/validators/invoiceValidation";
import common from "@/utils/common";

export async function POST(request) {
  let response = {};
  try {
    const session = await getSession();
    const user_id = session.user.id;
    let data = await request.json();
    const caseModel = await prisma.cases.findUnique({
      where: { id: data.case_id },
    });
    const validated = invoiceValidation(data, caseModel.hourly_rate);
    if (validated.error) {
      response.error = true;
      response.message = validated.messages;
    } else {
      const case_id = data.case_id;
      const due_on = data.due_on;
      let total_amount = 0;

      // Convert amount in correct format
      // Calculate total amount
      validated.particulars.forEach((item, index) => {
        total_amount += Number(item.amount);
        validated.particulars[index].amount = Number(item.amount);
      });
      total_amount = Number(total_amount);

      let particulars = JSON.stringify(validated.particulars);
      let uploadedFiles = data?.temp_files
        ? JSON.stringify(data.temp_files)
        : null;

      await prisma.$transaction(async (tx) => {
        const caseModel = await tx.cases.findUnique({
          where: { id: case_id },
        });

        if (caseModel) {
          const caseInvoices = await tx.case_invoices.findMany({
            where: {
              case_id: caseModel.id,
              user_id: user_id,
            },
          });

          let allInvoiceAmout = total_amount;
          if (caseInvoices) {
            caseInvoices.forEach((item) => {
              allInvoiceAmout += Number(item.total_amount);
            });
          }

          if (allInvoiceAmout <= caseModel.maximum_compensation) {
            const caseInvoiceModel = await tx.case_invoices.create({
              data: {
                case_id,
                user_id,
                particulars,
                total_amount,
                due_on,
                files: uploadedFiles,
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
                  content:
                    invoice.name + " added by " + session.user.name + ".",
                },
              });

              // Move uploaded files from temp to destination directory
              if (data?.temp_files && Array.isArray(data.temp_files)) {
                data.temp_files.forEach((doc) => {
                  moveFile(
                    common.publicPath("temp/" + doc.fileName), // source path
                    common.publicPath(
                      "uploads/invoice_documents/" + doc.fileName // destination path
                    )
                  );
                });
              }

              response.success = true;
              response.message = "Invoice added successfully.";
              response.id = caseInvoiceModel.id;
            }
          } else {
            response.error = true;
            response.message =
              "The total amount of all invoices cannot exceed the maximum compensation amount.";
          }
        } else {
          response.error = true;
          response.message = "Record not found.";
        }
      });
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
