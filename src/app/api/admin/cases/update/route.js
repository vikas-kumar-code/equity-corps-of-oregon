import { NextResponse } from "next/server";

import casesSchema from "@/joi/casesSchema";
import common from "@/utils/common";
import fs from "fs";
import { deleteFile, getSession, moveFile } from "@/utils/serverHelpers";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";

export async function POST(request) {
  const response = {};
  const data = await request.json();
  const caseId = parseInt(data.id);
  const session = await getSession();
  const authUser = await prisma.users.findUnique({
    where: { id: session.user.id },
  });
  try {
    const validated = await validateAsync(casesSchema, await request.json());
    if (validated.errors) {
      response.error = true;
      response.message = validated.errors;
    } else {
      // begin transaction
      await prisma.$transaction(async (tx) => {
        // delete all Case associated names
        const deleteAssociatedNames = await tx.case_associated_names.deleteMany(
          {
            where: {
              case_id: caseId,
            },
          }
        );

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
            case_number: validated.case_number,
            title: validated.title,
            case_associated_names: {
              create: validated.belongs_to.map((belongsTo) => {
                return { name: belongsTo };
              }),
            },
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
            logs: {
              create: {
                content: `Case updated by ${authUser.name}.`,
              },
            },
          },
        });

        // move uploaded documents
        validated.documents.forEach((doc) => {
          moveFile(
            common.publicPath("temp/" + doc.file_name), // source path
            common.publicPath("uploads/case_documents/" + doc.file_name) // destination path
          );
        });

        // Check, has deleted_documents field?
        if (
          validated?.deleted_documents &&
          Array.isArray(validated?.deleted_documents) &&
          validated?.deleted_documents.length > 0
        ) {          
          validated.deleted_documents.forEach((doc) => {            
            deleteFile(common.publicPath("uploads/case_documents/" + doc));
          });
        }
      });
      response.success = true;
      response.message = "Case updated successfully.";
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
