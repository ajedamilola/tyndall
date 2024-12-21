"use client"
import { generateArticles } from '@/app/api/article/functions';
import { editUser, generateMoreArticles, getUserById } from '@/app/api/user/functions'
import Logout from '@/app/components/logout';
import SessionValidator from '@/app/components/sessionValidator'
import React, { useEffect, useState } from 'react'

function Page() {
  const [content, setContent] = useState("")
  async function act() {
    setContent("loading")
    await generateMoreArticles(window.userId)
    setContent("")
  }

  return (
    <div>
      <SessionValidator />
      <button className="bg-green-500 px-5 py-2 text-white rounded-lg" onClick={act}>Test AI Generation Abilities</button>
      <br />
      {content}
      <Logout />
    </div>
  )
}

export default Page