"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Zap, BookOpen, Beaker, BarChart2, HelpCircle, UploadCloud, User, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from "@/components/ui/separator"

const mainMenuItems = [
  { icon: Zap, label: 'Quick Start', route: '/quickstart' },
  { icon: BookOpen, label: 'Library', route: '/library/profiles' },
  { icon: Beaker, label: 'Lab', route: '/lab/profile-creation' },
  { icon: BarChart2, label: 'Dashboard', route: '/dashboard' },
]

const bottomMenuItems = [
  { icon: UploadCloud, label: 'Upgrade', route: '/upgrade' },
]

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true)

  const renderMenuItem = (item: any, index: any) => (
    <li key={index}>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "flex items-center w-full px-4 py-3 text-left transition-colors group",
          item.route === pathname 
            ? "bg-purple-gradient text-white hover:bg-purple-gradient hover:text-white" 
            : "hover:bg-gray-200 text-gray-700",
          "justify-start"
        )}
      >
        <Link href={item.route} className="flex items-center w-full">
          <item.icon className={cn(
            "flex-shrink-0 w-6 h-6 mr-3",
            item.route === pathname 
              ? "text-white group-hover:text-white" 
              : "text-gray-700 group-hover:text-gray-900"
          )} />
          <span className={cn(
            item.route === pathname 
              ? "text-white group-hover:text-white" 
              : "text-gray-700 group-hover:text-gray-900"
          )}>
            {item.label}
          </span>
        </Link>
      </Button>
    </li>
  )

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "fixed top-4 left-4 p-2 z-50 transition-all duration-300 -ml-5",
          isOpen ? "left-64" : "left-4"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
      </Button>
      
      <aside className={cn(
        "sidebar fixed top-0 left-0 flex flex-col h-screen bg-gray-50 text-gray-700 transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-0 -left-64"
      )}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 flex justify-center items-center -mt-9">
            <Link href="/" className="sidebar-logo">
              <Image 
                src="/assets/icons/junologo2.svg" 
                alt="Juno logo" 
                width={180}
                height={80}
                className="transition-all duration-300"
              />
            </Link>
          </div>
          <Separator className="my-2 -mt-12" />
          <nav className="sidebar-nav flex-grow">
            <SignedIn>
              <ul className="space-y-2">
                {mainMenuItems.map(renderMenuItem)}
              </ul>
            </SignedIn>
          </nav>
          <div className="mt-auto">
            <ul className="space-y-2">
              {bottomMenuItems.map(renderMenuItem)}
            </ul>
            <SignedIn>
              <div className="mt-4 px-4 mb-3">
                <UserButton afterSignOutUrl="/" showName />
              </div>
            </SignedIn>
            <SignedOut>
              <Button asChild className="button bg-purple-gradient bg-cover w-full mt-4">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar