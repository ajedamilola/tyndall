"use client"
import React, { useEffect, useState } from 'react'
import { getLikedArticles, getUserById } from '@/app/api/user/functions'
import SessionValidator from '../components/sessionValidator'
import SideBar from '../feed/components/SideBar'
import Tweet from '../components/tweet'
import MobileNav from '../components/mobileNav'
import { Skeleton } from '@/components/ui/skeleton'

function page() {
  SessionValidator({})
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [likedArticles, setLikedArticles] = useState([])
  async function getUserData() {
    const data = await getUserById(window.userId)
    const likedData = await getLikedArticles(window.userId);
    setUser(data)
    setLikedArticles(likedData)
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
          <h1 className='text-2xl font-bold'>Liked Articles</h1>
        </div>
        <hr className='opacity-10' />
        {loading && <div className='p-4'>
          <Skeleton className={"h-7 w-[500px] max-w-[50vw]"} />
          <Skeleton className={"h-20 mt-5 w-[800px] max-w-[80vw]"} />
        </div>}
        {likedArticles.map(article => <Tweet tweet={article} key={article.id} />)}
        <MobileNav />
      </div>
    </div>
  )
}

export default page