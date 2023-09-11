import path from "path";
import fs from "fs";
import mime from "mime";
import { NextResponse } from "next/server";

export async function GET(request, data) {
  try {
    // Directory accessible public/images only
    const filePath = path.join(
      process.cwd(),
      "public/images",
      data.params.path.join("/")
    );
    if (!fs.existsSync(filePath)) {
      return new NextResponse.json(
        { error: "File not found..!" },
        { status: 404 }
      );
    }

    // Detect the Content-Type using the mime package
    const contentType = mime.getType(filePath);
    if (!contentType) {
      return new NextResponse.json(
        { error: "File type not recognized..!" },
        { status: 404 }
      );
    }

    const fileName = path.basename(filePath);
    const headers = new Headers();
    // headers.set("Content-Disposition", `attachment; filename=${fileName}`);
    headers.set("Content-Type", contentType);

    const fileStream = fs.createReadStream(filePath);
    return new NextResponse(fileStream, { headers });
  } catch (error) {
    return NextResponse.json({ error: true, message: "File not found..!" });
  }
}
