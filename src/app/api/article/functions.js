"use server"

import { anthropic } from "@/lib/ai"
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

    console.time("Duration")
    const response = await anthropic.messages.create({
      model: process.env.LITE_MODEL,
      max_tokens: 8192,
      temperature: 0,
      system: "You are part of a education resource hub , you are a bot generate  highly educative articles. Generate educational articles that a researcher or student might want to read based on the fields, areas and domain you are given. so the response will be an array Article objects. Each article object has the following fields: title,summary,tags,category. Your response should be purely in JSON. if you find any sexually explicit, illegal content or come across any error or issue repond with a object with an error key stating the nature of your error. Let your JSON Be Minnified and no line breaks",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `
                 Fields: ${allowedDomains.join(",")}
        Limit: ${limit}
        Excluded Topics: ${simmilarTopics.map(a => a.title)}
        Level: ${level}
              `
            }
          ]
        }
      ]
    });
    let rawText = response.content[0].text;
    console.timeEnd("Duration")
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

export async function generateAIArticleContent(id, isAPI = false) {
  let article = await prisma.article.findUnique({
    where: {
      id: id
    },
    select: {
      title: true,
      fields: true,
      category: true,
      summary: true,
      id: true
    }
  });
  if (article) {
    await prisma.article.update({
      where: {
        id
      },
      data: {
        contentStatus: "Generating"
      }
    })
  }
  try {
    const response = await anthropic.messages.create({
      model: process.env.PRO_MODEL,
      max_tokens: 8192,
      temperature: 0,
      system: "\nYou are an article content generator that is part of an educational platform. you generate content that are educative, highly-educative and human-like.  you will be provided the basic details about the article and you will generate the contents of that topic in html format and properly styled with tailwindcss. make sure you put italics, bolds, basic colouration where neccesary. ensure your articles feels like it is well researched and well thought-out and contains links to external articles to help the reader right inside the content. Let the content be extensive.  let your response will be in JSON format with two keys content, references. the content key is your html content and the references is an array of containing two keys: title and link. your output JSON and HTML must be minnified and contain no line breaks.\n",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `
              Topic: ${article.title}
              Summary: ${article.summary}
              Category: ${article.category}
              Fields: ${article.fields.join(",")}
              `
            }
          ]
        }
      ]
    });
    let rawText = response.content[0].text;
    await fs.writeFile("response.json", rawText);
    const aiArticle = JSON.parse(rawText);
    article = await prisma.article.update({
      where: {
        id: article.id
      },
      data: {
        content: aiArticle.content,
        references: aiArticle.references,
        contentStatus: "Generated"
      }
    })
    return isAPI ? true : { article }
  } catch (error) {
    console.log(error)
    await prisma.article.update({
      where: {
        id: id
      },
      data: {
        contentStatus: "NotGenerated"
      }
    })
    return isAPI ? false : { err: "Unable to generate at this time" }
  }

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

//This is for generating the content of multiple articles
