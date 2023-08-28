import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import casesSchema from "@/joi/casesSchema";
import common from "@/utils/common";
import fs from "fs";
import { moveFile } from "@/utils/serverHelpers";

export async function PUT(request, data) {
  import prisma from "@/utils/prisma";
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

      // delete all Milestones
      const deleteMilestones = await tx.case_milestones.deleteMany({
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
          id: caseId,
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
                document_name: doc.document_name,
                file_name: doc.file_name,
                uploaded_on: doc.uploaded_on,
              };
            }),
          },
        },
      });

      // move uploaded documents
      record.documents.forEach((doc) => {
        moveFile(
          common.publicPath("temp/" + doc.file_name), // source path
          common.publicPath("uploads/case_documents/" + doc.file_name) // destination path
        );
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
