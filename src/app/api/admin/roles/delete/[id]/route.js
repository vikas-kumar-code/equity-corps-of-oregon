import { NextResponse } from "next/server";


export async function DELETE(request, data) {
    import prisma from "@/utils/prisma";
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