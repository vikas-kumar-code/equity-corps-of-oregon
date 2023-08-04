import { NextResponse } from "next/server";
import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, data) {
    const user = await prisma.users.findUnique({
        where: {
            id: Number(data.params.id),
        },
    });
    return NextResponse.json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            status: user.status
        }
    });
}

export async function PUT(request, data) {
    const user = await request.json();
    const userSchema = Joi.object({
        name: Joi.required(),
        email: Joi.string().email().required(),
        password: Joi.string(),
        confirm_password: Joi.ref('password'),
        status: Joi.number().required(),
        role_id: Joi.number(),
    })

    try {
        const record = await userSchema.validateAsync(user);
        if (record) {
            let response;
            if (record.password) {
                response = await prisma.users.update({
                    data: {
                        name: record.name,
                        email: record.email,
                        password: await hash(record.password, 10),
                        status: record.status,
                        role_id: record.role_id,
                    },
                    where: {
                        id: Number(data.params.id),
                    }
                });
            }
            else {
                response = await prisma.users.update({
                    data: {
                        name: record.name,
                        email: record.email,
                        status: record.status,
                        role_id: record.role_id,
                    },
                    where: {
                        id: Number(data.params.id),
                    }
                });
            }
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