import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession, moveFile } from "@/utils/serverHelpers";
import invoiceValidation from "@/validators/invoiceValidation";
import fs from "fs";
import path from "path";
import common from "@/utils/common";

export async function PUT(request, data) {
  let response = {};
  try {
    const session = await getSession();
    let req = await request.json();
    const id = parseInt(data.params.id);
    const caseModel = await prisma.cases.findUnique({
      where: { id: req.case_id },
    });
    const validated = invoiceValidation(req, caseModel.hourly_rate);
    if (validated.error) {
      response.error = true;
      response.message = validated.messages;
    } else {
      const caseInvoice = await prisma.case_invoices.findUnique({
        where: { id, user_id: session.user.id },
      });

      if (caseInvoice && caseModel) {
        if (caseInvoice.status === 0) {
          let total_amount = 0;
          validated.particulars.forEach((item, index) => {
            total_amount += Number(item.amount);
            validated.particulars[index].amount = Number(item.amount);
          });
          total_amount = Number(total_amount);
          let particulars = JSON.stringify(validated.particulars);
          let uploadedFiles = validated?.temp_files
            ? JSON.stringify([...validated.temp_files, ...validated.files])
            : null;

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
                hours_worked: validated.hours_worked,
                files: uploadedFiles,
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

              if (validated.temp_files && Array.isArray(validated.temp_files)) {
                validated.temp_files.forEach((doc) => {
                  moveFile(
                    common.publicPath("temp/" + doc.fileName), // source path
                    common.publicPath(
                      "uploads/invoice_documents/" + doc.fileName // destination path
                    )
                  );
                });
              }

              if (
                Array.isArray(validated.deletedFiles) &&
                validated.deletedFiles.length > 0
              ) {
                validated.deletedFiles.forEach((doc) => {
                  const filePath = path.join(
                    process.cwd(),
                    "public",
                    "uploads",
                    "invoice_documents",
                    doc
                  );
                  if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
                });
              }

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
              "The total amount of all invoices cannot exceed the maximum compensation amount.";
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
