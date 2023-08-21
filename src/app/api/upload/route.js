import { NextResponse } from "next/server";
import { extname } from "path";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import common from "@/utils/common";

export async function POST(request) {
  const data = await request.formData();
  let response = {};
  return NextResponse.json({ success: true });
  try {
    const file = data.get("document") || data.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = extname(file.name);
    const fileName = Date.now() + fileExt;
    const tempPath = common.basePath("public/temp");
    const destPath = common.basePath("public/temp/" + fileName);

    // If file_name and file_path is present
    // Check the file is already exists
    if (data.get("file_name") && data.get("file_path")) {
      let checkPath = data.get("file_path");
      if (checkPath[0] !== "/") {
        checkPath = "/" + checkPath;
      }
      checkPath = common.publicPath(
        checkPath + "/" + data.get("file_name") + fileExt
      );
      console.log(checkPath);
      if (existsSync(checkPath)) {
        response.error = true;
        response.message = "A file with this name already exists.";
        return NextResponse.json(response);
      }
    }

    if (!existsSync(tempPath)) {
      mkdirSync(tempPath, { recursive: true });
    }
    await writeFile(destPath, buffer);
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
