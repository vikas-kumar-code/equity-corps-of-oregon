import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

export async function DELETE(request) {
  const response = {};
  try {
    const session = await getSession();
    const data = await request.json();
    const id = parseInt(data.id);
    if (id) {
      const caseDocumentModel = await prisma.case_documents.delete({
        where: {
          id: id,
          uploaded_by: session.user.id,
        },
      });
      if (caseDocumentModel) {
        // delete file from server
        if (caseDocumentModel.file_name) {
          const filePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            "case_documents",
            caseDocumentModel.file_name
          );
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
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
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
