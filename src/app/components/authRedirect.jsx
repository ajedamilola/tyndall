"use client"
import React, { useEffect, useState } from 'react'
import SessionValidator from './sessionValidator'
import { useRouter } from 'next/navigation'

function AuthRedirect({ to }) {
  const [r, setR] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (window.userId) {
      router.replace(to)
    }
  }, [r])

  return (
    <div>
      <SessionValidator callBack={() => setR(!r)} />
    </div>
  )
}

export default AuthRedirect