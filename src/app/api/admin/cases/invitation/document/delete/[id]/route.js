import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { deleteFile, getSession } from "@/utils/serverHelpers";
import path from "path";

export async function DELETE(request, data) {
  const response = {};
  try {
    const session = await getSession();    
    const id = parseInt(data.params.id);
    if (id) {
      const caseDocument = await prisma.case_documents.findUnique({
        where: { id, uploaded_by: session.user.id },
      });
      if (caseDocument) {

        const caseDocumentModel = await prisma.case_documents.delete({
          where: { id, uploaded_by: session.user.id },
        });

        if (caseDocumentModel) {
          // delete file from server
          if (caseDocumentModel.file_name) {
            deleteFile(
              path.join(
                process.cwd(),
                "public",
                "uploads",
                "case_documents",
                caseDocumentModel.file_name
              )
            );
          }
          await prisma.logs.create({
            data: {
              case_id: caseDocumentModel.case_id,
              content: `Document (${caseDocumentModel.document_name}) deleted by ` + session.user.name + ".",
            },
          });

          response.success = true;
          response.message = "Document deleted successfully.";
        } else {
          response.error = true;
          response.message = "Record not found.";
        }
      } else {
        response.error = true;
        response.message = "Record not found.";
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
