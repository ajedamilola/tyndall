import { generateAIArticleContent, getArticleById, getFullArticle } from '@/app/api/article/functions'
import { redirect } from 'next/navigation'
import React from 'react'
import ShowArticle from './showArticle'

async function page({ params }) {
  const { id } = await params
  let article = await getFullArticle(id)
  if (!article) {
    return redirect("/feed")
  }
  if (article.contentStatus == "NotGenerated") {
    article = await generateAIArticleContent({ id, isAPI: false })
    if (!article) {
      return redirect("/feed")
    } else {
      return redirect(`/feed/${id}`)
    }
  }
  //TODO: If time allows we can use whisper to "talk"
  //The reason why i put the main content in a seperate component is because the logic requires useState and hooks and those wont make it into the server component
  return (
    <ShowArticle article={article} />
  )
}

export async function generateMetadata({ params }) {
  const { id } = await params
  let article = await getArticleById(id)
  if (!article) {
    return redirect("/feed")
  }
  return {
    title: article.title,
    description: article.summary,
  };
}

export default page