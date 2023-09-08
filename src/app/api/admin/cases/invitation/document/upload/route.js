import { NextResponse } from "next/server";
import { extname } from "path";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import common from "@/utils/common";
import prisma from "@/utils/prisma";
import { getSession } from "@/utils/serverHelpers";

export async function POST(request) {
  const response = {};
  const data = await request.formData();
  const session = await getSession();
  try {
    if (data.get("document")) {
      if (data.get("document_name")) {
        if (data.get("case_id")) {
          const caseModel = await prisma.cases.findUnique({
            where: { id: data.get("case_id") },
          });
          if (caseModel) {
            const file = data.get("document");
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileExt = extname(file.name);
            const fileName = Date.now() + fileExt;
            const destPath = common.basePath("public/uploads/case_documents");
            const saveFilePath = common.basePath(
              "public/uploads/case_documents/" + fileName
            );            
            if (!existsSync(destPath)) {
              mkdirSync(destPath, { recursive: true, mode: "777" });
            }
            await writeFile(saveFilePath, buffer);

            const caseDocumentModel = await prisma.case_documents.create({
              data: {
                case_id: caseModel.id,
                document_name: data.get("document_name"),
                file_name: fileName,
                uploaded_by: session.user.id,
              },
            });

            if (caseDocumentModel) {
              response.success = true;
              response.message = "File uploaded successfully.";
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
        response.message = "Document name is required.";
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
