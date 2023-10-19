import { NextResponse } from "next/server";
import casesSchema from "@/joi/casesSchema";
import common from "@/utils/common";
import { getSession, moveFile } from "@/utils/serverHelpers";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";

export async function POST(request) {
  const session = await getSession();
  const authUser = await prisma.users.findUnique({
    where: { id: session.user.id },
  });

  let response = {};
  try {
    const validated = await validateAsync(casesSchema, await request.json());
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      // Prepare clients data
      let clientsData;
      if (validated.clients.length > 0) {
        clientsData = validated.clients?.map((clients) => {
          return {
            first_name: clients.first_name,
            last_name: clients.last_name,
            dob: clients.dob,
          };
        });
      }
      await prisma.cases.create({
        data: {
          added_by: session.user.id,
          maximum_compensation: validated.maximum_compensation,
          hourly_rate: validated?.hourly_rate || null,
          case_number: validated.case_number,
          title: validated.title,
          description: validated.description,
          case_milestones: { create: validated.milestones },
          case_documents: {
            create: validated.documents.map((doc) => {
              return {
                document_name: doc.document_name,
                file_name: doc.file_name,
                uploaded_on: doc.uploaded_on,
              };
            }),
          },
          clients: JSON.stringify(clientsData),
          logs: {
            create: {
              content: `A case added by ${authUser.name}.`,
            },
          },
        },
      });

      // Move uploaded documents
      validated.documents.forEach((doc) => {
        moveFile(
          common.publicPath("temp/" + doc.file_name), // source path
          common.publicPath("uploads/case_documents/" + doc.file_name) // destination path
        );
      });
      response.success = true;
      response.message = "New case added successfully.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
    console.log(error);
    if (error.code === "P2002") {
      response.message = { case_number: "Case number already exists." };
    }
  }
  return NextResponse.json(response);
}
