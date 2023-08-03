import { NextResponse } from "next/server";
import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
                return NextResponse.json({
                    success: true,
                    message: 'Role added successfully.'
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