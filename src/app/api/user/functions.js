"use server"

import prisma from "@/lib/prisma"

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

export async function editUser({ id, preferences, name }) {
  const former = await getUserById(id);

  try {
    const user = await prisma.user.update({
      where: {
        superTokenId: id
      },
      data: {
        preferences: preferences || former.preferences,
        name: name || former.name
      }
    })
    return user;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export async function getPersonalArticles({
  page = 1,
  userId
}) {
  const user = await getUserById(userId);
  const count = await prisma.article.count({
    where: {
      OR: [
        {
          category: {
            in: user.preferences
          },
        },
        {
          fields: {
            hasSome: user.preferences
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
            in: user.preferences
          },
        },
        {
          fields: {
            hasSome: user.preferences
          }
        }
      ]
    },
    skip: (page - 1 * 100),
    take: (page + 1) * 100
  })

  return { articles, moreAvailable: count >= 1 }
}