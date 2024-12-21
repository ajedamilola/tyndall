"use server"

import { model, trimResponse } from "@/lib/ai"
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

    const chat = await model.flash.generateContent([
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
    let textResponse = trimResponse(chat.response.text());
    await fs.writeFile("response.json", textResponse);
    return JSON.parse(textResponse);
  } catch (error) {
    console.log(error)
    return { err: "Unable to generate at this time" }
  }

}

export async function generateArticleContent(id) {
  //TODO: Implement this
}