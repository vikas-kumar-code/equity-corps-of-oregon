import { NextResponse } from "next/server";
import Joi from "joi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import prisma from "@/utils/prisma";
export async function GET(request) {

    try {
        const session = await getServerSession(authOptions);
        const user = await prisma.users.findUnique({
            where: {
                id: Number(session.user.id),
            },
            select: {
                name: true,
                email: true
            },
        });
        if (user) {
            return NextResponse.json({
                success: true,
                record: user
            });
        }
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ error: true, message: err });
    }
}

export async function PUT(request) {
    const role = await request.json();
    const fieldsSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })

    try {
        const record = await fieldsSchema.validateAsync(role);
        if (record) {
            const session = await getServerSession(authOptions);
            const user = await prisma.users.update({
                data: {
                    name: record.name,
                    email: record.email,
                },
                where: {
                    id: Number(session.user.id),
                }
            });
            if (user) {
                return NextResponse.json({ success: true, message: 'Profile updated successfully.' });
            }
        }
    }
    catch (err) {
        return NextResponse.json({ error: true, message: err });
    }
}