import { NextResponse } from "next/server";
import Joi from "joi";
import { join, extname } from "path"
import { writeFile, copyFile, unlink } from "fs/promises";


export async function POST(request) {
    const data = await request.formData();
    //console.log(data);
    /* const dataSchema = Joi.object({
        file: Joi.binary()
    }) */

    try {
        const file = data.get('document');
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = join('/', 'tmp', file.name);
        await writeFile(path, buffer)
        const newFileName = data.get('document_name') + extname(file.name);
        await copyFile(path, './public/documents/' + newFileName)
        await unlink(path)

        return NextResponse.json({
            success: true,
            file: { document_name: data.get('document_name'), uploaded_on: new Date() }
        });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ error: true, message: err });
    }
}