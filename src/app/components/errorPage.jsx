import { Button } from '@/components/ui/button'
import React from 'react'
import { RefreshCcw } from "lucide-react"

function ErrorPage({ err, callBack }) {
  return (
    <div className='h-screen flex flex-col items-center justify-center text-center bg-[#1c1c1c] text-white'>
      <div>
        <h1 className="text-2xl font-bold">An Error occured</h1>
        <div className="text-sm text-center py-3">
          {err}
        </div>
        <Button onClick={callBack}><RefreshCcw /> Retry</Button>
      </div>
    </div>
  )
}

export default ErrorPage