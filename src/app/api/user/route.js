import { withSession } from "supertokens-node/nextjs";
import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from '../../config/backend';

ensureSuperTokensInit();

export function GET(request) {
  return withSession(request, async (err, session) => {
    if (err) {
      return NextResponse.json({
        err: "An Error occured"
      }, { status: 500 })
    }
    if (!session) {
      return NextResponse.json({
        err: "You need to respond here"
      }, { status: 401 })
    }

    return NextResponse.json({
      id: session.getUserId(),
    });
  });
}