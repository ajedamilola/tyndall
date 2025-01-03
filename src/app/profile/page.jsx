"use client"
import React, { useEffect, useState } from 'react'
import SessionValidator from '../components/sessionValidator'
import SideBar from '../feed/components/SideBar'
import { Loading } from 'notiflix'
import { getUserById } from '../api/user/functions'
import ProfileDetails from './ProfileDetails'
import MobileNav from '../components/mobileNav'

function page() {
  const [user, setUser] = useState(null)
  async function getData() {
    //TODO: To error handling later
    const user = await getUserById(window.userId)
    setUser(user)
    Loading.remove()
  }
  useEffect(() => {
    Loading.standard("Loading User Data")
    setTimeout(() => {
      getData()
    }, 100)
  }, [])
  return (
    <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
      <SessionValidator />
      <SideBar user={user} />
      <div className="flex-1">
        {user && <ProfileDetails user={user} />}
      </div>
      <MobileNav />
    </div>
  )
}

export default page