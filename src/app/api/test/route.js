import { NextResponse } from "next/server";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import common from "@/utils/common";

export async function GET(request, data) {
  try {
    // Render the template with data
    const templatePath = common.basePath("src/ejs/email-template.ejs");
    const emailHtml = await ejs.renderFile(templatePath, data);

    return NextResponse.json({
      success: emailHtml,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
