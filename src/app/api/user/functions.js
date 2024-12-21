"use server"

import prisma from "@/lib/prisma"
import { generateAIArticles } from "../article/functions";

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      superTokenId: id
    }
  })
}

export async function storeuser({ email, id, provider }) {
  //Since the entire user authentication is handled by Supertokens
  const former = await getUserById(id);
  if (!former) {
    await prisma.user.create({
      data: {
        email,
        provider,
        superTokenId: id
      }
    })
  }
  return true;
}

export async function editUser({ id, preferences, name, level }) {

  try {
    const former = await getUserById(id);
    const user = await prisma.user.update({
      where: {
        superTokenId: id
      },
      data: {
        preferences: preferences || former.preferences,
        name: name || former.name,
        level: level || former.level
      }
    })
    return user;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export async function getArticleFeed({
  page = 1,
  userId
}) {
  const user = await getUserById(userId);
  const count = await prisma.article.count({
    where: {
      OR: [
        {
          category: {
            in: user.preferences,
            mode: "insensitive"
          },
        },
        {
          fields: {
            hasSome: user.preferences,
          }
        }
      ]
    },
  })

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        {
          category: {
            in: user.preferences,
            mode: "insensitive"
          },
        },
        {
          fields: {
            hasSome: user.preferences,
          }
        }
      ]
    },
    skip: (page - 1 * 100),
    take: (page + 1) * 100
  })

  return { articles, moreAvailable: count >= 1 }
}

export async function generateMoreArticles(id) {
  const user = await getUserById(id);
  const aiArticles = await generateAIArticles(user.preferences, 50, user.level);
  if (!aiArticles.err) {
    console.log(aiArticles.map(a => ({
      title: a.title,
      summary: a.summary,
      fields: a.tags,
      category: a.category
    })))
    const articles = await prisma.article.createManyAndReturn({
      skipDuplicates: true,
      data: aiArticles.map(a => ({
        title: a.title,
        summary: a.summary,
        fields: a.tags,
        category: a.category,
        content: ""
      }))
    })

    return { articles }
  } else {
    return { articles: [], warn: aiArticles.err }
  }
  await prisma.article.createManyAndReturn({
    data: [
      {
        content: "",
        summary: "",
        title: "",
        fields: [],
        category: "",

      }
    ]
  })


}