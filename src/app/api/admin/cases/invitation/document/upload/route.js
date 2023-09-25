import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession, moveFile } from "@/utils/serverHelpers";
import common from "@/utils/common";

export async function POST(request) {
  const response = {};
  try {
    const data = await request.json();
    const session = await getSession();

    if (data.documents) {
      if (data.case_id) {
        const caseModel = await prisma.cases.findUnique({
          where: {
            id: parseInt(data.case_id),
            case_invitations: {
              some: {
                user_id: session.user.id,
              },
            },
          },
        });
        if (caseModel) {
          if (Array.isArray(data.documents) && data.documents.length > 0) {
            await prisma.$transaction(async (tx) => {
              const caseDocumentModel = await tx.case_documents.createMany({
                data: data.documents.map((item) => {
                  return {
                    case_id: caseModel.id,
                    document_name: item.document_name,
                    file_name: item.file_name,
                    uploaded_by: session.user.id,
                  };
                }),
              });
              const uplaodedDocs = data.documents.map(
                (item) => item.document_name
              );
              if (caseDocumentModel) {
                // Move uploaded documents
                data.documents.forEach((doc) => {
                  moveFile(
                    common.publicPath("temp/" + doc.file_name), // source path
                    common.publicPath("uploads/case_documents/" + doc.file_name) // destination path
                  );
                });

                await tx.logs.create({
                  data: {
                    case_id: caseModel.id,
                    content:
                      `Documents (${uplaodedDocs.join(",")}) uploaded by ` +
                      session.user.name +
                      ".",
                  },
                });

                response.success = true;
                response.message = "File uploaded successfully.";
              } else {
                response.error = true;
                response.message = "Something went wrong. please try again.";
              }
            });
          } else {
            response.error = true;
            response.message = "Something went wrong. please try again.";
          }
        } else {
          response.error = true;
          response.message = "Record not found.";
        }
      } else {
        response.error = true;
        response.message = "Case id is missing.";
      }
    } else {
      response.error = true;
      response.message = "Select a valid document.";
    }
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}
