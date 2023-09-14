import permissionSchema from "@/joi/permissionSchema";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { NextResponse } from "next/server";

export async function POST(request) {
  let response = {};
  const permissionReq = await request.json();
  console.log(permissionReq.permissions[0].role_id);
  try {
    if (permissionReq) {
        const deletedData = await prisma.permissions.deleteMany({
          where: {
            role_id: permissionReq.permissions[0].role_id,
          },
        });
        if (deletedData) {
          const record = await prisma.permissions.createMany({
            data: [
              {
                role_id: permissionReq.permissions[0].role_id,
                route_id: permissionReq.permissions[0].route_id,
              },
            ],
          });
          if (record) {
            response.success = true;
            response.message = "Permission assigned successfully!";
            response.record = record;
          }
      }
    }
  } catch (error) {
    response.errors = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
