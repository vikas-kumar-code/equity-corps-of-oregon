import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import { PrismaClient } from "@prisma/client";

import prisma from "@/utils/prisma";
export async function GET(request) {
    const headerList = headers();


    const toalUsers = await prisma.users.count();

    const activeUsers = await prisma.users.count({
        where: {
            status: 1
        }
    });

    return NextResponse.json({
        success: true,
        records: {
            todaysLoans: 5,
            totalLoans: 5,
            toalUsers: toalUsers,
            activeUsers: activeUsers
        }
    });
}