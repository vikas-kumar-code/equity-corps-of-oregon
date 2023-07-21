import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import Joi from "joi";
import { hash } from "bcrypt";

export async function GET(request) {
    const pageNumber = request.nextUrl.searchParams.get('page') ? parseInt(request.nextUrl.searchParams.get('page')) : 1;
    const recordPerPage = 10;

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

export async function POST(request) {
    const user = await request.json();
    const userSchema = Joi.object({
        name: Joi.required(),
        email: Joi.string().email().required(),
        password: Joi.required(),
        confirm_password: Joi.ref('password'),
        status: Joi.number().required(),
        role_id: Joi.number(),
    })

    try {
        const record = await userSchema.validateAsync(user);
        if (record) {
            const response = await prisma.users.create({
                data: {
                    name: record.name,
                    email: record.email,
                    password: await hash(record.password, 10),
                    status: record.status,
                    role_id: record.role_id,
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
        return NextResponse.json({ error: true, message: err });
    }
}