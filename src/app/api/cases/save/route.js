import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import casesSchema from "@/joi/casesSchema";
import common from "@/utils/common";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from "fs";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  let response = {};
  try {
    const data = await casesSchema.validateAsync(await request.json(), {
      abortEarly: false,
      allowUnknown: true,
    });
    await prisma.cases.create({
      data: {
        added_by: session.user.id,
        case_number: data.case_number,
        title: data.title,
        case_associated_names: {
          create: data.belongs_to.map((belongsTo) => {
            return { name: belongsTo };
          }),
        },
        description: data.description,
        case_milestones: { create: data.milestones },
        case_documents: {
          create: data.documents.map((doc) => {
            return {
              document_name: doc?.uploaded_file
                ? doc.document_name + "." + doc?.uploaded_file.split(".").pop()
                : doc?.document_name,
              uploaded_on: doc.uploaded_on,
            };
          }),
        },
      },
    });

    // processing uploaded documents    
    let destinationPath = common.publicPath("uploads/case_documents")
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    data.documents.forEach((doc) => {
        let sourceFilePath = common.publicPath("temp/" + doc.uploaded_file)
        if (fs.existsSync(sourceFilePath)) {
          let saveFileName = doc.document_name + "." + doc?.uploaded_file.split(".").pop(); 
          fs.rename(sourceFilePath, destinationPath+'/'+saveFileName, (err) => {});
      }
    });
    response.success = true;
    response.message = "New case added successfully.";
  } catch (error) {
    response.error = true;
    response.message = common.getErrors(error);
  }
  return NextResponse.json(response);
}
