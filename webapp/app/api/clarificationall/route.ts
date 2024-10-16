// app/api/clarifications/route.ts
import { NextResponse } from "next/server";
import { uwajudgeDB } from "@/lib/database-client";
import { NextApiRequest, NextApiResponse } from "next";

// 处理 GET 请求
export async function GET() {
  try {
    const clarifications = await uwajudgeDB.clarification.findMany();
    return NextResponse.json(clarifications); // 返回澄清数据作为 JSON
  } catch (error) {
    console.error("Error fetching clarifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch clarifications" },
      { status: 500 },
    );
  }
}
