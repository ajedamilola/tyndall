"use server"

import { model, trimResponse } from "@/lib/ai"
import prisma from "@/lib/prisma"
import fs from "fs/promises"
import { getUserById } from "../user/functions"

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
        Level: ${level}
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

export async function getArticleById(id) {
  return await prisma.article.findUnique({
    id: id
  })

}

export async function generateArticleContent(id) {
  const article = await prisma.article.findUnique({
    where: {
      id: id
    }
  });
  const chat = await model.pro.generateContent([
    {
      text: ""
    }
  ])
}

export async function getArticles({ userId, page = 1 }) {
  try {
    if (userId) {
      //Get Personalized articles
      const user = await getUserById(userId)
      const articles = await prisma.article.findMany({
        where: {
          OR: [
            {
              fields: {
                hasSome: user.preferences,
              }
            },
            {
              category: {
                in: user.preferences,
                mode: "insensitive"
              }
            }
          ]
        },
        orderBy: {
          updated_at: "desc"
        }
      })
      return { articles: articles.sort(() => Math.random() - 0.5) }
    }
    const articles = await prisma.article.findMany({
      skip: (page - 1) * 100,
      take: 100,
      orderBy: {
        updated_at: "desc"
      }
    })
    return { articles: articles.sort(() => Math.random() - 0.5) }
  } catch (error) {
    console.log(error)
    return { err: "Unable to fetch articles at this time" }
  }
}