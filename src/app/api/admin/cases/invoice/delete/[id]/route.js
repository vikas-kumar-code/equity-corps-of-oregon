import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

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
        const caseInvoiceDelete = await prisma.case_invoices.delete({
          where: { id: caseInvoiceModel.id, user_id: session.user.id },
        });
        if (caseInvoiceDelete) {
          response.success = true;
          response.message = "Case invoice has been deleted successfully.";
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
