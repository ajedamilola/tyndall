"use server"

import { model } from "@/lib/ai"
import prisma from "@/lib/prisma"
import fs from "fs/promises"

//Abeg your limit make he no pass like 100 it might be too much for the AI Ejor, Biko, Abeg 🙏  
export async function generateAIArticles(domains = [], limit = 10, level = "beginner") {
  try {
    const simmilarTopics = await prisma.article.findMany({
      where: {
        category: {
          in: domains,
          mode: "insensitive"
        },
        fields: {
          hasSome: domains
        }
      },
      select: {
        title: true
      }
    })
    const allowedDomains = await Promise.all(domains.filter(async item => {
      const count = await prisma.article.count({
        where: {
          category: {
            contains: item,
            mode: "insensitive"
          }
        }
      })
      return count <= (process.env.MAX_FIELD_ARTICLES || 500)
    }))

    const chat = await model.pro.generateContent([
      {
        text: "You are part of a education resource hub , you are a bot generate  highly educative articles. Generate educational articles that a researcher or student might want to read based on the fields, areas and domain you are given. so the response will be an array Article objects. Each article object has the following fields: title,summary,tags,category. Your response should be purely in JSON. if you find any sexually explicit, illegal content or come across any error or issue repond with a object with an error key stating the nature of your error. Let your JSON Be Minnified and no line breaks",
      },
      {
        text: `
        Fields: ${allowedDomains.join(",")}
        Limit: ${limit}
        Excluded Topics: ${simmilarTopics.map(a => a.title)}
      `
      }
    ])
    let rawText = chat.response.text();
    if (rawText.includes("```json")) {
      const start = rawText.indexOf("```json")
      const end = rawText.lastIndexOf("```")
      rawText = rawText.substring(start + 8, end);
    }
    await fs.writeFile("response.json", rawText);
    return JSON.parse(rawText);
  } catch (error) {
    console.log(error)
    return { err: "Unable to generate at this time" }
  }

}
export async function getArticleById(id){
  return await prisma.article.findUnique({
      id: id
    })
  
}

export async function toggleArticleLike(articleId, userId) {
  try {
    const existingLike = await prisma.like.findFirst({
      where: { userId, articleId },
    });

    if (existingLike) {
      // Remove the like
      await prisma.like.delete({ where: { id: existingLike.id } });
      await prisma.article.update({
        where: { id: articleId },
        data: { likes: { decrement: 1 } },
      });
    } else {
      // Create a new like
      await prisma.like.create({
        data: { userId, articleId },
      });
      await prisma.article.update({
        where: { id: articleId },
        data: { likes: { increment: 1 } },
      });
    }

    // Refetch the article to get the updated likes count
    const updatedArticle = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        _count: { select: { likes: true } }, 
      },
    });

    return updatedArticle;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}

export async function createComment(articleId, userId, content) {
  try {
    const newComment = await prisma.comment.create({
      data: {
        articleId,
        userId,
        content,
      },
    });
    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error; 
  }
}

export async function getCommentsByArticleId(articleId) {
  try {
    const comments = await prisma.comment.findMany({
      where: { articleId },
      include: {
        user: { select: { name: true } }, // Include user name
      },
      orderBy: { createdAt: 'desc' }, // Order comments by creation time
    });
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
