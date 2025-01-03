"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Book, Home, LogOut, Star, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { signOut } from 'supertokens-web-js/recipe/session'

function SideBar({ user }) {
  const [openLogOutModal, setOpenLogOutModal] = useState(false);
  const router = useRouter()
  async function handleLogout() {
    await signOut();
    router.replace("/auth"); // or to wherever your logic page is
  }
  return (
    <div className='hidden md:flex flex-col lg:w-64 md:w-16 p-4 border-r border-gray-800 sticky top-0 h-screen'>
      <AlertDialog open={openLogOutModal} onOpenChange={setOpenLogOutModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Ae you sure you wanna Logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='flex flex-col items-center lg:items-start space-y-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.email}`} />
          <AvatarFallback className='text-black'>{user?.name && user?.name[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='hidden lg:block'>
          {user?.name ? <h2 className='font-bold '>{user?.name}s</h2> : <Skeleton className={"w-[120px] h-full"} />}
          {/* <p className='text-gray-500'>@johndoe</p> */}
        </div>
      </div>{" "}
      <nav className='mt-8 space-y-4 flex-1'>
        <Link
          href={"/feed"}
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa] hover:bg-gray-700 flex items-center p-3 rounded-md cursor-pointer '
        >
          <Home className='h-6 w-6' />
          <span className='hidden lg:inline'>Home</span>
        </Link>
        <Link
          href={"/liked-articles"}
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa] hover:bg-gray-700 flex items-center p-3 rounded-md cursor-pointer '
        >
          <Star className='h-6 w-6' />
          <span className='hidden lg:inline'>Favorites</span>
        </Link>
        <Link className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa] hover:bg-gray-700 flex items-center p-3 rounded-md cursor-pointer ' href={"/profile"}>
          <User className='h-6 w-6' />
          <span className='hidden lg:inline'>User Profile</span>
        </Link>
      </nav>
      <div className='mt-auto pt-4'>
        <Button
          variant='ghost'
          className='w-full justify-start gap-4 text-xl hover:text-red-500'
          onClick={async () => {
            setOpenLogOutModal(true)
          }}
        >
          <LogOut className='h-6 w-6' />
          <span className='hidden lg:inline'>Logout</span>
        </Button>
      </div>
    </div>
  )
}

export default SideBar