import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import Joi from "joi";
import { hash } from "bcrypt";

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

export async function POST(request) {
    const role = await request.json();
    const feldsSchema = Joi.object({
        name: Joi.required(),
        status: Joi.number().required(),
    })

    try {
        const record = await feldsSchema.validateAsync(role);
        if (record) {
            const response = await prisma.roles.create({
                data: {
                    name: record.name,
                    status: record.status
                }
            });
            if (response) {
                return NextResponse.json({ success: true });
            }
            else {
                return NextResponse.json({ error: true });
            }
        }
    }
    catch (err) {
        if (err.code === 'P2002') {
            return NextResponse.json({
                error: true,
                message: { name: 'Name already exists.' }
            });
        }
        return NextResponse.json({ error: true, message: err });
    }
}