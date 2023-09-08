import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
    let records = [];
    let response = {};
    try {
        records = await prisma.case_invitations.findMany({
            select: {
                user: {
                    select: {
                        id: true,
                        name: true
                    },
                },
            },
            distinct: ['user_id']
        });
        // output response
        response.success = true;
        response.records = records;
    } catch (error) {
        response.error = true;
        response.message = error.message;
    }
    return NextResponse.json(response);
}

export const dynamic = 'force-dynamic'