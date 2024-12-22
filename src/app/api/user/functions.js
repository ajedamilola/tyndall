"use server"
//Abeg your limit make he no pass like 100 it might be too much for the AI Ejor, Biko, Abeg 🙏 
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
        superTokenId: id,
        telementry: {
          connect: {
            likedArticles: [],
            viewedArticles: [],
            commentedArticles: [],
            dislikedArticles: []
          }
        }
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
    take: 100
  })

  return { articles, moreAvailable: count >= 1 }
}

export async function generateMoreArticles(id) {
  const user = await getUserById(id);
  const aiArticles = await generateAIArticles(user.preferences, 50, user.level);
  if (!aiArticles.error) {
    console.log(aiArticles.articles.map(a => ({
      title: a.title,
      summary: a.summary,
      fields: a.tags,
      category: a.category
    })))
    const articles = await prisma.article.createManyAndReturn({
      skipDuplicates: true,
      data: aiArticles.articles.map(a => ({
        title: a.title,
        summary: a.summary,
        fields: a.tags,
        category: a.category,
        content: ""
      }))
    })

    return { articles }
  } else {
    return { err: aiArticles.error }
  }
}

export async function toggleArticleLike({ articleId, userId }) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const telementry = await prisma.telementry.findUnique({
      whereere: {
        id: user.telementryId
      }
    })
    if (article.likes.includes(userId)) {
      // Remove the like
      await prisma.article.update({
        where: { id: articleId },
        data: {
          likes: {
            set: article.likes.filter(id => id !== userId)
          }
        },
      });

      await prisma.telementry.update({
        where: {
          id: user.telementryId
        }, data: {
          likedArticles: {
            set: telementry.likedArticles.filter(id => id !== articleId)
          }
        }
      })
    } else {
      // Add the like
      await prisma.article.update({
        where: { id: articleId },
        data: {
          likes: {
            push: userId
          }
        },
      });

      await prisma.telementry.update({
        where: {
          id: user.telementryId
        }, data: {
          likedArticles: {
            push: articleId
          }
        }
      })
    }

    // Refetch the article to get the updated likes
    const updatedArticle = await prisma.article.findUnique({
      where: { id: articleId }
    });

    return updatedArticle;
  } catch (error) {
    console.error('Error toggling like:', error);
    return { err: "An error occured please kindly try again" }
  }
}


export async function createComment({ articleId, userId, content }) {
  try {
    const newComment = await prisma.comment.create({
      data: {
        articleId,
        userId,
        content,
      },
    });
    const user = await getUserById(userId)
    await prisma.telementry.update({
      where: {
        id: user.telementryId,
        data: {
          commentedArticles: {
            push: articleId
          }
        }
      }
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
    return { err: "An error occured please kindly try again" }
  }
}

export async function suggestArticles({
  userId, range = 100, amount = 10
}) {
  const user = await getUserById(userId);
  let telementry = await prisma.telementry.findFirst({
    where: {
      userId
    },
    include: {
      article: true
    }
  })
  if (!telementry) {
    telementry = await prisma.telementry.create({
      data: {
        userId,
        likedArticles: [],
        viewedArticles: [],
        commentedArticles: [],
        dislikedArticles: []
      }
    })
  }
  const { commentedArticles, dislikedArticles, likedArticles } = telementry

  //Seekout our candidate articles
  const articles = await prisma.article.findMany({
    where: {
      id: {
        in: [...likedArticles, ...commentedArticles],
        notIn: [...dislikedArticles]
      }
    },
    orderBy: {
      created_at: "desc"
    },
    take: range
  })
  //Returning shuffled articles simply use random algorithm to sort the latest articles for the user
  const shuffled = articles.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, amount);
  return { articles: selected };


}

export async function submitFeedback({ userId, content, article, positive }) {
  //Sha warn the user if there is previous feedback it will be updated
  const feedback = await prisma.feedback.findFirst({
    where: {
      userSuperTokenId: userId,
      articleId: article.id
    }
  })
  if (feedback) {

    await prisma.feedback.update({
      where: {
        id: feedback.id
      },
      data: {
        userSuperTokenId: userId,
        articleId: article.id,
        content: feedback,
        positive,
      }
    })
  } else {

    await prisma.feedback.create({
      data: {
        userSuperTokenId: userId,
        articleId: article.id,
        content: feedback,
        positive,
      }
    })
  }
  return { msg: "Feecback sent" };
}
