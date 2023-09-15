import permissionSchema from "@/joi/permissionSchema";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { NextResponse } from "next/server";

export async function POST(request) {
  let response = {};
  const permissionReq = await request.json();
  try {
    if (permissionReq) {
      const validated = await validateAsync(permissionSchema, permissionReq);
      if (validated.errors) {
        response.error = true;
        response.message = validated.errors;
      } else {
        const deletedData = await prisma.permissions.deleteMany({
          where: {
            role_id: permissionReq.permissions[0].role_id,
          },
        });
        if (deletedData) {
          const record = await prisma.permissions.createMany({
            data: permissionReq.permissions,
          });

          if (record) {
            response.success = true;
            response.message = "Permissions assigned successfully!";
            response.record = record;
          }
        }
      }
    }
  } catch (error) {
    response.errors = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
