import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import casesSchema from "@/joi/casesSchema";
import common from "@/utils/common";
import fs from "fs";

export async function PUT(request, data) {
  const prisma = new PrismaClient();
  let response = {};
  const caseId = parseInt(data.params.id);
  try {
    const record = await casesSchema.validateAsync(await request.json(), {
      abortEarly: false,
      allowUnknown: true,
    });    
    // begin transaction
    await prisma.$transaction(async (tx) => {
      // delete all Case associated names
      const deleteAssociatedNames = await tx.case_associated_names.deleteMany({
        where: {
          case_id: caseId,
        },
      });

      // delete all docuements
      const deleteCaseDocuments = await tx.case_documents.deleteMany({
        where: {
          case_id: caseId,
        },
      });

      // Update case record
      const updateCaseRecord = await tx.cases.update({
        where: {
          id: parseInt(data.params.id),
        },
        data: {
          case_number: record.case_number,
          title: record.title,
          case_associated_names: {
            create: record.belongs_to.map((belongsTo) => {
              return { name: belongsTo };
            }),
          },
          description: record.description,
          case_milestones: { create: record.milestones },
          case_documents: {
            create: record.documents.map((doc) => {
              return {
                document_name: doc?.uploaded_file
                  ? doc.document_name +
                    "." +
                    doc?.uploaded_file.split(".").pop()
                  : doc?.document_name,
                uploaded_on: doc.uploaded_on,
              };
            }),
          },
        },
      });

      // Move newly uploaded documents from temp to case_documents directory
      let destinationPath = common.publicPath("uploads/case_documents");
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }      
      record.documents.forEach((doc) => {
        if (doc?.uploaded_file) {
          let sourceFilePath = common.publicPath("temp/" + doc.uploaded_file);
          if (fs.existsSync(sourceFilePath)) {
            let saveFileName =
              doc.document_name + "." + doc?.uploaded_file.split(".").pop();
            fs.rename(
              sourceFilePath,
              destinationPath + "/" + saveFileName,
              (err) => {}
            );
          }
        }
      });

      // Check, has deleted_documents field?
      if (
        record?.deleted_documents &&
        Array.isArray(record?.deleted_documents) &&
        record?.deleted_documents.length > 0
      ) {
        record.deleted_documents.forEach((doc) => {
          let docPath = common.publicPath("uploads/case_documents/" + doc);
          if (fs.existsSync(docPath)) {
            fs.unlinkSync(docPath);
          }
        });
      }
    });

    response.success = true;
    response.message = "Case updated successfully.";
  } catch (error) {
    response.error = true;
    response.message = common.getErrors(error);
  }
  return NextResponse.json(response);
}
