import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import prisma from "@/utils/prisma";

export async function GET(request, data) {
  let response = {};
  try {
    const record = await prisma.cases.findUnique({
      where: {
        id: Number(data.params.id),
      },
      include: {
        case_associated_names: true,
        case_milestones: true,
        case_documents: true,
      },
    });
    response.success = true;
    response.message = "Case details";
    response.data = {
      case_number: record.case_number,
      title: record.title,
      belongs_to: record.case_associated_names.map(
        (belongsTo) => belongsTo.name
      ),
      description: record.description,
      milestones:
        record.case_milestones.map((milestone) => {
          return {
            milestone_date: milestone.milestone_date,
            comment: milestone.comment,
          };
        }) || [],
      documents:
        record?.case_documents?.map((doc) => {
          return {
            document_name: doc.document_name,
            file_name: doc.file_name,
            uploaded_on: doc.uploaded_on,
          };
        }) || [],
    };
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
