
"use client"
import React, { useEffect, useState } from 'react'
import { getUserById } from '../../api/user/functions'
import SessionValidator from '../../components/sessionValidator'
import SideBar from '../../feed/components/SideBar'
import Tweet from '../../components/tweet'
import { searchArticles } from '@/app/api/article/functions'
import { toast } from 'sonner'

function page({ params }) {
  const { query } = React.use(params)
  SessionValidator({})
  const [user, setUser] = useState({})
  const [articles, setArticles] = useState([])

  async function getUserData() {
    const data = await getUserById(window.userId)
    const searchData = await searchArticles({ query });
    setUser(data)
    if (searchData.err) {
      toast.error(searchData.err)
    } else {
      setArticles(searchData)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getUserData()
    }, 200)
  }, [])

  return (
    <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
      <SideBar user={user} />
      <div className='flex-1 border-r border-gray-800 pb-16 md:pb-0'>
        <div className="p-3 sticky top-0 bg-[#1c1c1c] z-10 w-full">
          <h1 className='text-2xl font-bold'>Search Results for "{query}"</h1>
        </div>
        <hr className='opacity-10' />
        {articles?.articles?.map(article => <Tweet tweet={article} key={article.id} />)}
      </div>
    </div>
  )
}

export default page
