import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(request, data) {
  let response = {};
  try {
    const record = await prisma.cases.findUnique({
      where: {
        id: Number(data.params.id),
      },
      include: {
        case_milestones: true,
        case_documents: true,
        logs: {
          orderBy: { id: "desc" },
        },
      },
    });
    response.success = true;
    response.message = "Case details";
    response.data = {
      case_number: record.case_number,
      title: record.title,
      maximum_compensation: record.maximum_compensation,
      hourly_rate: record.hourly_rate,
      description: record.description,
      documents:
        record?.case_documents?.map((doc) => {
          return {
            id: doc.id,
            document_name: doc.document_name,
            file_name: doc.file_name,
            uploaded_on: doc.uploaded_on,
          };
        }) || [],
      logs: record?.logs,
    };

    if (record.case_milestones.length > 0) {
      response.data.milestones = record.case_milestones.map((milestone) => {
        return {
          milestone_date: milestone.milestone_date,
          comment: milestone.comment,
        };
      });
    }

    const clients = record.clients ? JSON.parse(record.clients) : [];
    if (clients.length > 0) {
      response.data.clients = clients;
    }
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
