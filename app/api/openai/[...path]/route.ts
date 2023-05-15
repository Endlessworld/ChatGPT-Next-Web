import { prettyObject } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth";
import { requestOpenai } from "../../common";

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("[OpenAI Route] params ", params);

  const authResult = auth(req);
  if (authResult.error && authResult.status === 401) {
    return NextResponse.json(authResult, {
      status: 401,
    });
  } else if (authResult.error && authResult.status === 429) {
    return NextResponse.json(authResult, {
      status: 429,
    });
  } else if (authResult.error) {
    return NextResponse.json(authResult, {
      status: 500,
    });
  }

  try {
    return await requestOpenai(req);
  } catch (e) {
    console.error("[OpenAI] ", e);
    return NextResponse.json(prettyObject(e));
  }
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
