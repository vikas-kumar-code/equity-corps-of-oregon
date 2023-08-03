import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request) {
    const pageNumber = request.nextUrl.searchParams.get('page') ? parseInt(request.nextUrl.searchParams.get('page')) : 1;
    const recordPerPage = 10;
    let where = {};
    if (request.nextUrl.searchParams.get('name')) {
        where = {
            ...where,
            name: {
                contains: request.nextUrl.searchParams.get('name')
            }
        }
    }
    if (request.nextUrl.searchParams.get('email')) {
        where = {
            ...where,
            email: {
                contains: request.nextUrl.searchParams.get('email')
            }
        }
    }


    const skip = (pageNumber * recordPerPage) - recordPerPage;
    const records = await prisma.users.findMany({
        skip: skip,
        take: recordPerPage,
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            created_at: true,
            role: true
        },
        where: { ...where },
        orderBy: [
            { id: 'desc' }
        ]
    });
    const totalRecords = await prisma.users.count();
    return NextResponse.json({
        records: JSON.stringify(records, (key, value) => (typeof value === 'bigint' ? value.toString() : value)),
        totalRecords: totalRecords
    });
}