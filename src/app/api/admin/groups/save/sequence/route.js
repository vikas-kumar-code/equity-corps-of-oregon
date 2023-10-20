import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  let response = {};
  try {
    const data = await request.json();
    await prisma.$transaction(async (tx) => {
      if (data?.orders && Array.isArray(data?.orders)) {
        data?.orders.forEach(async (order) => {
          await prisma.groups.update({
            where: { id: parseInt(order.id) },
            data: {
              sequence: Number(order.sequence),
            },
          });
        });
        response.success = true;
        response.message = 'The sequence of groups has been updated successfully.';
      } else {
        response.error = true;
        response.message = "Invalid sequence data.";
      }
    });
  } catch (error) {
    response.error = true;
    response.message = error.message;
  }
  return NextResponse.json(response);
}
