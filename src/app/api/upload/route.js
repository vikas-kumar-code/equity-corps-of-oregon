import { NextResponse } from "next/server";
import { extname } from "path";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import common from "@/utils/common";

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB in bytes

export async function POST(request) {
  const data = await request.formData();
  let response = {};

  try {
    const files = data.getAll("files");

    if (files.length === 0) {
      response.error = true;
      response.message = "No files were uploaded.";
      return NextResponse.json(response);
    }

    response.files = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const fileSize = bytes.byteLength;
      const buffer = Buffer.from(bytes);
      const fileExt = extname(file.name).toLowerCase();
      const allowedExtensions = [".docx", ".xl", ".xls", ".jpg", ".jpeg", ".png", ".pdf"];

      if (!allowedExtensions.includes(fileExt)) {
        response.error = true;
        response.message = "File type not allowed.";
        return NextResponse.json(response);
      }

      if (fileSize > MAX_FILE_SIZE) {
        response.error = true;
        response.message = "File size exceeds the maximum allowed (30MB).";
        return NextResponse.json(response);
      }

      const originalFileName = file.name;
      const fileName = Date.now() + Math.floor(Math.random() * 99999) + fileExt;
      const tempPath = common.basePath("public/temp");
      const destPath = common.basePath("public/temp/" + fileName);      

      if (!existsSync(tempPath)) {
        mkdirSync(tempPath, { recursive: true, mode: "777" });
      }

      await writeFile(destPath, buffer);

      // Add file details to the response
      response.files.push({
        originalFileName,
        fileName,
        extension: fileExt,
      });
    }

    response.success = true;
    response.message = "File(s) uploaded successfully.";
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }

  return NextResponse.json(response);
}
