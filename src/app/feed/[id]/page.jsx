import { generateAIArticleContent, getArticleById } from '@/app/api/article/functions'
import { redirect } from 'next/navigation'
import React from 'react'
import parse from "html-react-parser"
import { Button } from '@/components/ui/button'

async function page({ params }) {
  const { id } = params
  let article = await getArticleById(id)
  if (!article) {
    return redirect("/feed")
  }
  if (article.contentStatus == "NotGenerated") {
    article = await generateAIArticleContent({ id, isAPI: false })
    if (!article) {
      return redirect("/feed")
    }
  }
  //TODO: If time allows we can use whisper to "talk"
  return (
    <div>
      {article.contentStatus == "Generating" || article.contentStatus == "NotGenerated" ? <div>
        Content Still Generating please check back later
        <Button onClick={() => {
          generateAIArticleContent({ id, isAPI: false })
        }}>Hasten This Process</Button>
      </div>
        :
        <div>
          My Guy Style this shit
        </div>}
      <h1 className='text-2xl font-bold'>{article.title}</h1>
      <div className="text-sm opacity-80">{article.summary}</div>
      {article.content && parse(article.content)}
      {JSON.stringify(article.references)}
    </div>
  )
}

export default page