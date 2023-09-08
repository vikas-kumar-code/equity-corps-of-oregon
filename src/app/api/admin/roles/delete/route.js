import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(request) {
    const req = await request.json();
    const deleted = await prisma.roles.delete({
        where: {
            id: Number(req.id),
        },
    });
    if (deleted) {
        return NextResponse.json({
            success: true,
            message: 'Role deleted successfully.'
        });
    }
}