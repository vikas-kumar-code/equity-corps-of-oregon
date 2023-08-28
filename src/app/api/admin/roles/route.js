import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(request) {
    const pageNumber = request.nextUrl.searchParams.get('page') ? parseInt(request.nextUrl.searchParams.get('page')) : 1;
    const recordPerPage = 10;

    const skip = (pageNumber * recordPerPage) - recordPerPage;
    const records = await prisma.roles.findMany({
        skip: skip,
        take: recordPerPage,
        orderBy: [
            { id: 'desc' }
        ]
    });
    const totalRecords = await prisma.roles.count();
    return NextResponse.json({
        success: true,
        records: JSON.stringify(records, (key, value) => (typeof value === 'bigint' ? value.toString() : value)),
        totalRecords: totalRecords
    });
}