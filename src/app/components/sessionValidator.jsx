"use client"
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Session from 'supertokens-auth-react/recipe/session';

function SessionValidator({ callBack }) {
  const router = useRouter()
  //This components job is to fetch the id of the current user and ensures it is in the window object
  async function getJWT() {
    if (!await Session.doesSessionExist() || typeof window === "undefined") return router.replace("/auth")
    let userId = await Session.getUserId();
    let jwt = await Session.getAccessToken();
    console.log(userId)
    window.userId = userId;
    window.jwt = jwt

    if (callBack) {
      callBack()
    }
  }
  useEffect(() => {
    getJWT()
  }, [typeof window])

  return (
    <></>
  )
}

export default SessionValidator