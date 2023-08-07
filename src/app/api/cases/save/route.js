import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import Joi from "joi";

export async function POST(request) {
    const prisma = new PrismaClient();
    const user = await request.json();
    const userSchema = Joi.object({
        case_number: Joi.required().required(),
        title: Joi.string().email().required(),
        belogns_to: Joi.string().required(),
        description: Joi.string().required(),
        milestones: Joi.array().min(1),
        documents: Joi.array()
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
        if (err.code === 'P2002') {
            return NextResponse.json({
                error: true,
                message: { email: 'Email already exists.' }
            });
        }
        return NextResponse.json({ error: true, message: err });
    }
}