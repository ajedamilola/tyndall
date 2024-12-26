"use client"
import React, { useEffect, useState } from 'react'
import { getUserById } from '../../api/user/functions'
import SessionValidator from '../../components/sessionValidator'
import SideBar from '../../feed/components/SideBar'
import Tweet from '../../components/tweet'
import { getCategoryArticles } from '@/app/api/article/functions'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

function page({ params }) {
  const { category } = React.use(params)
  const [loading, setLoading] = useState(true)
  SessionValidator({})
  const [user, setUser] = useState({})
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  async function getUserData() {
    setLoading(true)
    const data = await getUserById(window.userId)
    const likedData = await getCategoryArticles({ category, page });
    setUser(data)
    if (likedData.err) {
      toast.error(likedData.err)
    } else {
      setArticles(likedData)
    }
    setLoading(false)
  }
  useEffect(() => {
    //Using a delay so the user id would be in
    setTimeout(() => {
      getUserData()
    }, 200)
  }, [])


  return (
    <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
      <SideBar user={user} />
      <div className='flex-1 border-r border-gray-800 pb-16 md:pb-0'>
        <div className="p-3 sticky top-0 bg-[#1c1c1c] z-10 w-full">
          <h1 className='text-2xl font-bold'>{category.slice(0, 1).toUpperCase()}{category.slice(1)}</h1>
        </div>
        <hr className='opacity-10' />
        {loading && <div className='p-4'>
          <Skeleton className={"h-7 w-[500px] max-w-[50vw]"} />
          <Skeleton className={"h-20 mt-5 w-[800px] max-w-[80vw]"} />
        </div>}
        {articles?.articles?.map(article => <Tweet tweet={article} key={article.id} />)}
        {/* {JSON.stringify(articles)} */}
      </div>
    </div>
  )
}

export default page