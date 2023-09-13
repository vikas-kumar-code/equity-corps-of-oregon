import permissionSchema from "@/joi/permissionSchema";
import prisma from "@/utils/prisma";
import validateAsync from "@/utils/validateAsync";
import { NextResponse } from "next/server";


export async function POST(request){
    let response = {}

    try {
        const permissionData = validateAsync(permissionSchema, await request.json())
        if(permissionData.errors){
            response.error = true;
            response.message = permissionData.errors;
        }else{
            await prisma.permissions.createMany({
                data: {}
            })
        }
    } catch (error) {
        
    }
}