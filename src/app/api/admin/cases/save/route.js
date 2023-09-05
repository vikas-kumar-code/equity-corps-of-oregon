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
    const data = await validateAsync(casesSchema, await request.json());
    if (data.errors) {
      response.error = true;
      response.message = data.errors;
    } else {
      await prisma.cases.create({
        data: {
          added_by: session.user.id,
          case_number: data.case_number,
          title: data.title,
          case_associated_names: {
            create: data.belongs_to.map((belongsTo) => {
              return { name: belongsTo };
            }),
          },
          description: data.description,
          case_milestones: { create: data.milestones },
          case_documents: {
            create: data.documents.map((doc) => {
              return {
                document_name: doc.document_name,
                file_name: doc.file_name,
                uploaded_on: doc.uploaded_on,
              };
            }),
          },
          logs: {
            create: {
              content: `A case added by ${authUser.name}.`,
            },
          },
        },
      });

      // move uploaded documents
      data.documents.forEach((doc) => {
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
  }
  return NextResponse.json(response);
}
