"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Bell, ChevronDown, Search, ShoppingCart } from 'lucide-react'
import logo from '@/public/logo.png'
import { useState } from "react"

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

const NavbarSub = () => {
  const [email, setEmail] = useState('bensidahmedyacine.off@gmail.com')
  const [username, setUsername] = useState('Yacine Bensidahmed')

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between w-full px-4 md:px-6 relative">
        {/* Logo Section - Absolute Left */}
        <div className="flex items-center absolute left-4">
          <Image src={logo} alt="logo image" height={43} width={43} />
          <span className="ml-2 text-lg text-Black font-extrabold">Edulink</span>
        </div>

        {/* Search Section - Middle */}
        <div className="flex-1 flex justify-center">
          <form className="w-full max-w-[300px]">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for course"
                className="pl-8 w-full"
              />
            </div>
          </form>
        </div>

        {/* Profile and Icons - Absolute Right */}
        <div className="flex items-center gap-4 absolute right-4">
          <Button variant="ghost" className="hidden md:block">
            Become Instructor
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  src="/placeholder.svg"
                  width={32}
                  height={32}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 hoverTransition">
                My Courses
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 hoverTransition">
                Wishlist
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 hoverTransition">
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200 hoverTransition">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-slate-200 hoverTransition">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default NavbarSub

