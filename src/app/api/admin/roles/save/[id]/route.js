import { NextResponse } from "next/server";
import Joi from "joi";


import prisma from "@/utils/prisma";
export async function GET(request, data) {
    const record = await prisma.roles.findUnique({
        where: {
            id: Number(data.params.id),
        },
    });
    return NextResponse.json({
        success: true,
        record: {
            name: record.name,
            status: record.status
        }
    });
}

export async function PUT(request, data) {
    const role = await request.json();
    const fieldsSchema = Joi.object({
        name: Joi.string().required(),
        status: Joi.number().required(),
    })

    try {
        const record = await fieldsSchema.validateAsync(role);
        if (record) {
            const response = await prisma.roles.update({
                data: {
                    name: record.name,
                    status: record.status
                },
                where: {
                    id: Number(data.params.id),
                }
            });

            if (response) {
                return NextResponse.json({
                    success: true,
                    message: 'Role updated successfully.'
                });
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