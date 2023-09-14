import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, data) {
  let response = {};
  const role_id = parseInt(data.params.id);
  try {
    const routes = await prisma.routes.findMany({
      where: {
        parent_id: 0,
      },
      include: {
        children: true,
      },
    });

    const permissions = await prisma.permissions.findMany({
      where: {
        role_id,
      },
    });
    response.success = true;
    response.message = "Questions list";
    response.routes = routes;
    response.permissions = permissions.map((item)=>{
      const {id, ...rest} = item;
      return rest;
    });
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
