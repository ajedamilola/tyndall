import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateAIArticleContent } from "./functions";

export async function GET(request) {
  //TODO: Implement with Authentication
  //NOTE: Vercel has a max of 10S for functions and API so use little max values. unless we are hosting ourselves we can set it to as many as we want
  const searchParams = new URL(request.url).searchParams
  const max = searchParams.get("max") || 5
  const unGenerated = await prisma.article.findMany({
    where: {
      contentStatus: "NotGenerated",
      ai: true
    },
    take: Number(max),
    select: {
      id: true,
      title: true
    }
  })
  const queue = await Promise.all(unGenerated.map(async (article) => {
    const status = await generateAIArticleContent(article.id, true)
    return {
      status,
      id: article
    }
  }));
  return NextResponse.json(queue)
}