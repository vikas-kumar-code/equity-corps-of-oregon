import { NextResponse } from "next/server";
import Joi from "joi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { compare, hash } from "bcrypt";


import prisma from "@/utils/prisma";
export async function PUT(request) {
    const data = await request.json();
    const fieldsSchema = Joi.object({
        current_password: Joi.string().required(),
        new_password: Joi.string().required(),
        confirm_password: Joi.string().required(),
    })

    try {
        const record = await fieldsSchema.validateAsync(data);
        if (record) {
            const session = await getServerSession(authOptions);
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(session.user.id),
                }
            });
            if (user) {
                const isPasswordValid = await compare(record.current_password, user.password);
                if (isPasswordValid) {
                    if (record.new_password === record.confirm_password) {
                        const user = await prisma.users.update({
                            data: {
                                password: await hash(record.new_password, 10),
                            },
                            where: {
                                id: Number(session.user.id),
                            }
                        });
                        if (user) {
                            return NextResponse.json({ success: true, message: 'Password changed successfully.' });
                        }
                    }
                    else {
                        return NextResponse.json({
                            error: true,
                            message: {
                                confirm_password: 'Password does not match.'
                            }
                        });
                    }
                }
                else {
                    return NextResponse.json({
                        error: true,
                        message: {
                            current_password: 'Corrnet password is invalid.'
                        }
                    });
                }
            }
        }
    }
    catch (err) {
        return NextResponse.json({ error: true, message: err });
    }
}