import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function DELETE(request, data) {
    const prisma = new PrismaClient();
    const deleted = await prisma.users.delete({
        where: {
            id: Number(data.params.id),
        },
    });
    if (deleted) {
        return NextResponse.json({
            success: true,
            message: 'User has been deleted successfully.'
        });
    }
}