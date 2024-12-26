"use client"
import { Button } from '@/components/ui/button'
import { Home, Star, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function MobileNav() {
  {/* Mobile Bottom Navigation - Visible only on mobile */ }
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#1c1c1c] border-t border-gray-800 p-2 flex justify-around md:hidden'>
      <Link href={"/feed"}>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <Home className='h-6 w-6' />
        </Button>
      </Link>
      {/* <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
        <Search className='h-6 w-6' />
      </Button> */}
      <Link href={"/liked-articles"}>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <Star className='h-6 w-6' />
        </Button>
      </Link>
      <Link href={"/profile"}>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <User className='h-6 w-6' />
        </Button>
      </Link>
      {/* <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
        <Mail className='h-6 w-6' />
      </Button> */}
    </div>
  )
}

export default MobileNav