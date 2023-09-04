import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import fs from 'fs';
import path from 'path';

export async function DELETE(request, data) {

  let response = {};
  let deletedId = Number(data.params.id);
  try {
    const doc = await prisma.case_documents.findUnique({
      where: {
        id: deletedId
      }
    });
    if (doc) {
      // Delete the document associated with the cases
      const filePath = path.join(process.cwd(), 'public','uploads','case_documents', doc.file_name);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
    if (deletedId) {
      const deleted = await prisma.cases.delete({
        where: {
          id: deletedId,
        },
      });
      if (deleted) {
        response.success = true;
        response.message = "Case has been deleted successfully.";
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
