import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Book, Home, LogOut, Star } from 'lucide-react'
import React from 'react'

function SideBar({ user }) {
  return (
    <div className='hidden md:flex flex-col lg:w-64 md:w-16 p-4 border-r border-gray-800 sticky top-0 h-screen'>
      <div className='flex flex-col items-center lg:items-start space-y-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src='/placeholder.svg?height=48&width=48' />
          <AvatarFallback className='text-black'>{user?.name[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='hidden lg:block'>
          <h2 className='font-bold '>{user?.name}</h2>
          {/* <p className='text-gray-500'>@johndoe</p> */}
        </div>
      </div>{" "}
      <nav className='mt-8 space-y-4 flex-1'>
        <div
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa] hover:bg-gray-700 flex items-center p-3 rounded-md cursor-pointer'
        >
          <Home className='h-6 w-6' />
          <span className='hidden lg:inline'>Home</span>
        </div>
        <div
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa] hover:bg-gray-700 flex items-center p-3 rounded-md cursor-pointer'
        >
          <Star className='h-6 w-6' />
          <span className='hidden lg:inline'>Favorite</span>
        </div>
        <div
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa] hover:bg-gray-700 flex items-center p-3 rounded-md cursor-pointer'
        >
          <Book className='h-6 w-6' />
          <span className='hidden lg:inline'>Resources</span>
        </div>
      </nav>
      <div className='mt-auto pt-4'>
        <Button
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-red-500'
          onClick={() => setOpenLogOutModal(true)}
        >
          <LogOut className='h-6 w-6' />
          <span className='hidden lg:inline'>Logout</span>
        </Button>
      </div>
    </div>
  )
}

export default SideBar