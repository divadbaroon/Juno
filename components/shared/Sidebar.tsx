"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Zap, BookOpen, Beaker, BarChart2, UploadCloud, ChevronLeft, Menu } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'
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
  const { isSignedIn } = useUser();
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderMenuItem = (item: any, index: any) => (
    <li key={index}>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "flex items-center w-full px-4 py-3 text-left transition-all duration-300 group",
          item.route === pathname 
            ? "bg-blue-400 text-white hover:bg-blue-500" 
            : "hover:bg-gray-200 text-gray-700",
          "justify-start rounded-lg"
        )}
      >
        <Link href={item.route} className="flex items-center w-full">
          <item.icon className={cn(
            "flex-shrink-0 w-6 h-6 mr-3",
            item.route === pathname 
              ? "text-white" 
              : "text-gray-500 group-hover:text-gray-700"
          )} />
          <span className={cn(
            "font-medium",
            item.route === pathname 
              ? "text-white" 
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
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-4 z-50 transition-all duration-300 shadow-md",
          isOpen ? "left-64" : "left-4"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </Button>
      
      <aside className={cn(
        "fixed top-0 left-0 flex flex-col h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-40",
        isOpen ? "w-64" : "w-0",
        isMobile && !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 flex justify-center items-center">
            <Link href="/" className="sidebar-logo -mt-12">
              <Image 
                src="/assets/icons/junologo2.svg" 
                alt="Juno logo" 
                width={300}
                height={50}
                className="transition-all duration-300"
              />
            </Link>
          </div>
          <Separator className="my-2 -mt-12" />
          <nav className="flex-grow px-2">
            <ul className="space-y-1">
              {mainMenuItems.map(renderMenuItem)}
            </ul>
          </nav>
          <div className="mt-auto px-2 pb-4">
            <Separator className="my-2" />
            <ul className="space-y-1">
              {bottomMenuItems.map(renderMenuItem)}
            </ul>
            <div className="mt-4 ml-3">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" showName />
              ) : (
                <Button asChild className="w-full bg-black-500 hover:bg-black-600 text-white">
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar