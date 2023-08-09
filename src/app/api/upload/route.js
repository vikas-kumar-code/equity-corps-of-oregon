import { NextResponse } from "next/server";
import Joi from "joi";
import { join, extname } from "path";
import { writeFile, copyFile, unlink } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import common from "@/utils/common";

export async function POST(request) {
  const data = await request.formData();
  let response = {};
  try {
    const file = data.get("document");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = extname(file.name);
    const fileName = Date.now() + fileExt;
    const tempPath = common.basePath("public/temp");
    const destPath = common.basePath("public/temp/" + fileName);
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath, { recursive: true });
    }
    await writeFile(destPath, buffer);
    // await copyFile(path, './public/documents/' + newFileName)
    // await unlink(path)
    response.success = true;
    response.message = "File uploaded successfully.";
    response.file = fileName;
    response.extension = fileExt;
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}
