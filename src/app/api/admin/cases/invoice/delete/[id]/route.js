import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";
import fs from "fs";
import path from "path";

export async function DELETE(request, data) {
  let response = {};
  try {
    const id = parseInt(data.params.id);
    const session = await getSession();
    if (id) {
      const caseInvoiceModel = await prisma.case_invoices.findUnique({
        where: {
          id,
          user_id: session.user.id,
        },
      });
      if (caseInvoiceModel) {
        let files = JSON.parse(caseInvoiceModel.files)
        if (caseInvoiceModel.status === 0) {
          const caseInvoiceDelete = await prisma.case_invoices.delete({
            where: { id: caseInvoiceModel.id, user_id: session.user.id },
          });
          if (caseInvoiceDelete) {
            if(Array.isArray(files) && files.length > 0){
              files.forEach((file) => {
                const filePath = path.join(
                  process.cwd(),
                  "public",
                  "uploads",
                  "invoice_documents",
                  file.fileName
                );
                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                }
              });
            }
            response.success = true;
            response.message = "Case invoice has been deleted successfully.";
          }
        }else{
          response.error = true;
          response.message = 'You can not perform this action.';
        }
      }
    } else {
      response.error = true;
      response.message = "Record not found.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
