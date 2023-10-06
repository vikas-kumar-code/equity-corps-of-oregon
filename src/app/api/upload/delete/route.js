import { NextResponse } from "next/server";
import { existsSync, unlinkSync } from "fs";
import common from "@/utils/common";

export async function DELETE(request) {
  const data = await request.json();
  let response = {};
  try {
    if (data?.file) {
      let path = data?.path
        ? common.publicPath(data?.path + "/" + data?.file)
        : common.publicPath("temp/" + data?.file); // default delete path
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    response.success = true;
    response.message = "File deleted successfully.";
    response.fileName = data?.file;
  } catch (err) {
    response.error = true;
    response.message = err.message;
  }
  return NextResponse.json(response);
}
