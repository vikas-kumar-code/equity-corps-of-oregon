import { NextResponse } from "next/server";
import common from "@/utils/common";
import { getSession } from "@/utils/serverHelpers";
import prisma from "@/utils/prisma";
import sendMail from "@/utils/sendMail";

export async function POST(request, data) {
  let response = {};
  const id = parseInt(data.params.id);
  const session = await getSession();
  let req = {};
  try {
    req = await request.json();
  } catch {}

  try {
    const invoice = await prisma.case_invoices.findUnique({
      where: { id, user_id: session.user.id },
      include: {
        user: true,
        case: true,
      },
    });

    if (invoice) {
      const admins = await prisma.users.findMany({ where: { role_id: 1 } });
      if (invoice.status === 0) {
        const updateInvoice = await prisma.case_invoices.update({
          where: {
            id,
          },
          data: {
            status: 1,
          },
        });
        if (updateInvoice) {
          response.success = true;
          response.message = "The invoice has been sent for approval.";

          // Send notification to admin
          admins.forEach(async (admin) => {
            await sendMail({
              to: admin.email,
              templateId: common.params.templateId.invoiceForApproval,
              modelsData: {
                users: invoice.user,
                cases: invoice.case,
              },
            });
          });
        } else {
          response.error = true;
          response.message = "Something went wrong. please try again.";
        }
      } else if (invoice.status === 1) {
        const withdrawInvoice = await prisma.case_invoices.update({
          where: {
            id,
          },
          data: {
            status: 0,
            withdraw_remarks: req?.withdraw_remarks || "",
          },
        });
        if (withdrawInvoice) {
          response.success = true;
          response.message = "The invoice has been withdraw successfully.";
        } else {
          response.error = true;
          response.message = "Something went wrong. please try again.";
        }
      } else {
        response.error = true;
        response.message = "This invoice has already been sent for approval.";
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
