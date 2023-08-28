import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(request, data) {
    const deleted = await prisma.roles.delete({
        where: {
            id: Number(data.params.id),
        },
    });
    if (deleted) {
        return NextResponse.json({
            success: true,
            message: 'Role deleted successfully.'
        });
    }
}