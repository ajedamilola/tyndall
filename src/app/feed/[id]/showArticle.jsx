"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import parse from "html-react-parser"
import SessionValidator from '@/app/components/sessionValidator'
import { createComment, getUserById, suggestArticles } from '@/app/api/user/functions'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import { Block } from 'notiflix'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { BrainCircuit, MessageCircle } from 'lucide-react'
import MobileNav from '@/app/components/mobileNav'
import Tweet from '@/app/components/tweet'
import ErrorPage from '@/app/components/errorPage'

function ShowArticle({ article }) {
  SessionValidator({})
  const [user, setUser] = useState({})
  const [comments, setComments] = useState(article.comments)
  const [newComment, setNewComment] = useState("")
  const [simmilar, setSimmilar] = useState([])
  const [err, setErr] = useState(false)
  async function getUserData() {
    try {
      setErr(true)
      const data = await getUserById(window.userId)
      setSimmilar(await suggestArticles({
        userId: window.userId,
        articleId: article.id,
        amount: 5
      }))
      setUser(data)
    } catch (error) {
      console.log(error)
    } finally {
      setErr(false)
    }
  }
  useEffect(() => {
    //Using a delay so the user id would be in
    setTimeout(() => {
      getUserData()
    }, 200)
  }, [])

  if (err) return <ErrorPage callBack={getUserData} err={"An Error occured while fetching data"} />
  return (
    <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
      <SideBar user={user} />

      {/* Main Content */}
      <div className='flex-1 border-r border-gray-800 pb-16 md:pb-0'>
        {article.contentStatus == "Generating" || article.contentStatus == "NotGenerated" ? <div>
          <div className='p-3'>
            <h1 className='text-2xl font-bold'>{article.title}</h1>
            <div className="text-sm opacity-80">{article.summary}</div>
          </div>
          <hr className='opacity-10' />
          <div className='text-center pt-[20%] flex flex-col items-center'>
            <BrainCircuit size={90} />
            <div className="text-center py-3">
              Content Still Generating please check back later
            </div>
            <Link href={"/feed"}>
              <Button>Back</Button>
            </Link>
          </div>
        </div>
          :
          <div>
            <div className="p-3 sticky top-0 bg-[#1c1c1c] z-10">
              <div className="flex items-center">
                <div>
                  <h1 className='text-2xl font-bold'>{article.title}</h1>
                  <div className="text-sm opacity-80">{article.summary}</div>
                </div>
                <div className="flex-1"></div>
                <Link href={"#comment"}><MessageCircle size={20} /></Link>
              </div>

            </div>
            <hr className='opacity-10' />
            <div className="p-3">
              {article.content && parse(article.content)}
            </div>
            <hr className='opacity-10' />
            <div className="p-3">
              <h1 className="text-lg">References</h1>
              <div className="flex flex-wrap gap-3" >
                {article?.references?.map((reference, index) => (
                  <div key={index} className='bg-gray-800 p-2 rounded-md'>
                    <a href={reference.link} target="_blank" rel="noopener noreferrer">
                      {reference.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <p className='text-center text-sm py-3'>AI might not be fully accurate use with care and make sure to check the references</p>
            <hr className='opacity-10' />
            <h1 className="text-lg p-3">Comments</h1>
            <div className="">
              {comments?.map(comment => {
                return <div key={comment.id} className='border-b border-gray-800 p-2'>
                  <div className="flex gap-2 items-center">
                    <div className="text-white font-bold">{comment.user.name}</div>
                    <div className="opacity-50 text-sm">{dayjs(comment.createdAt).format("DD MMM,YYYY")}</div>
                  </div>
                  <div className="text-sm">
                    {comment.content}
                  </div>
                </div>
              })}
              <form id="comment" onSubmit={async () => {
                Block.standard("#comment", "Posting Comment")
                try {
                  const comment = await createComment({
                    content: newComment,
                    articleId: article.id,
                    userId: window.userId
                  })
                  setComments([...comments, comment])
                  toast.success("Comment posted successfully")
                } catch (error) {
                  console.log(error)
                  toast.error("Error posting comment")
                }
                Block.remove()
              }}>
                <Textarea placeholder='Write a comment' value={newComment} onChange={(e) => {
                  setNewComment(e.target.value)
                }} />
                <Button className='mt-3 px-10' type="submit">Post</Button>
              </form>
            </div>
          </div>}

        <hr className='opacity-10 mt-5' />
        <h1 className="text-lg p-3">See Reccomended Articles</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
          {simmilar?.articles?.map((article, index) => {
            return <Tweet tweet={article} key={index} />
          })}
        </div>
      </div>

      <MobileNav />

    </div>
  )
}

export default ShowArticle