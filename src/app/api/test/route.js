import { NextResponse } from "next/server";
import fs from "fs";
export async function GET(request, data) {

  return NextResponse.json({
    success: request.nextUrl.searchParams.get('q')
  });
}
