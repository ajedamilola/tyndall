"use client";
import { generateMoreArticles } from "@/app/api/user/functions";
import Logout from "@/app/components/logout";
import SessionValidator from "@/app/components/sessionValidator";
import React, { useState } from "react";
import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  User,
  Users,
  X,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  Plus,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Book,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for tweets

import {
  generateAIArticleContent,
  generateAIArticles,
} from "../api/article/functions";

function Page() {
  const [content, setContent] = useState("");
  async function act() {
    setContent("loading");
    let resp = await generateAIArticles({
      domains: ["Math", "Physics", "Chemistry"],
      limit: 10,
      level: "beginner",
    });
    setContent(resp);
  }

  const tweets = [
    {
      id: 1,
      author: "Sarah Johnson",
      handle: "@sarahj_tech",
      content:
        "Just deployed my first Next.js app! The new App Router is amazing 🚀",
      timestamp: "2h",
      likes: 245,
      retweets: 45,
      replies: 23,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      author: "Tech Weekly",
      handle: "@techweekly",
      content:
        "Breaking: Major breakthrough in quantum computing announced today. Researchers achieve new milestone in qubit stability.",
      timestamp: "4h",
      likes: 1892,
      retweets: 634,
      replies: 129,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      author: "Dev Community",
      handle: "@devcommunity",
      content:
        "🔥 Hot Take: CSS-in-JS vs Tailwind - what's your preference? The debate continues...",
      timestamp: "5h",
      likes: 753,
      retweets: 234,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      author: "AI Updates",
      handle: "@ai_daily",
      content:
        "New research paper shows promising results in natural language understanding. The future of AI looks brighter than ever!",
      timestamp: "6h",
      likes: 1245,
      retweets: 567,
      replies: 89,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      author: "Web Standards",
      handle: "@webstandards",
      content:
        "HTML6 draft specifications are now open for community feedback. Major changes coming to the web platform!",
      timestamp: "8h",
      likes: 2341,
      retweets: 890,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];
  //  <Logout />;
  return (
    <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
      {/* Left Sidebar - Hidden on mobile, icon-only on tablet, full on desktop */}
      <div className='hidden md:flex flex-col lg:w-64 md:w-16 p-4 border-r border-gray-800 sticky top-0 h-screen'>
        <div className='flex flex-col items-center lg:items-start space-y-4'>
          <Avatar className='h-12 w-12'>
            <AvatarImage src='/placeholder.svg?height=48&width=48' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='hidden lg:block'>
            <h2 className='font-bold'>John Doe</h2>
            <p className='text-gray-500'>@johndoe</p>
          </div>
        </div>

        <nav className='mt-8 space-y-4 flex-1'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa]'
          >
            <Home className='h-6 w-6' />
            <span className='hidden lg:inline'>Home</span>
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa]'
          >
            <Star className='h-6 w-6' />
            <span className='hidden lg:inline'>Favorite</span>
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start gap-4 text-xl hover:text-[#00b8aa]'
          >
            <Book className='h-6 w-6' />
            <span className='hidden lg:inline'>Resources</span>
          </Button>
        </nav>

        <div className='mt-auto pt-4'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-4 text-xl hover:text-red-500'
          >
            <LogOut className='h-6 w-6' />
            <span className='hidden lg:inline'>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 border-r border-gray-800 pb-16 md:pb-0'>
        <div className='sticky top-0 bg-[#1c1c1c]/80 backdrop-blur-sm z-10'>
          <div className='flex justify-between p-4 border-b border-gray-800'>
            <h1 className='text-xl font-bold'>For you</h1>
            <h1 className='text-xl font-bold text-gray-500'>Following</h1>
          </div>

          <div className='p-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />

              <Input
                placeholder='What content would you like?'
                className='pl-10 bg-gray-700 py-6 border-gray-800 rounded-lg w-full placeholder:text-gray-200'
              />
            </div>
          </div>
        </div>

        <div className='divide-y divide-gray-800'>
          <div className='p-4 border-b border-gray-800'>
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>
                Create beautiful images with Grok 2
              </h2>
              <p className='text-gray-400'>
                Transform your ideas into stunning visuals with our newest AI
                assistant, powered by X.
              </p>
              <Button className='bg-white text-black hover:bg-gray-200'>
                Get Grok
              </Button>
            </div>
          </div>

          <div className='pb-16 md:pb-0'>
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile and tablet */}
      <div className='hidden lg:block w-80 p-4'>
        <div className='sticky top-0 space-y-4'>
          <div className='bg-gray-800 rounded-xl p-4'>
            <h2 className='text-xl font-bold mb-4'>Suggested Tags</h2>
            <div className='flex flex-wrap gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #TechNews
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #WebDev
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #AI
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #Programming
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #JavaScript
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #ReactJS
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #MachineLearning
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #DataScience
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #CyberSecurity
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='rounded-lg text-black/85'
              >
                #CloudComputing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <div className='fixed bottom-0 left-0 right-0 bg-[#1c1c1c] border-t border-gray-800 p-2 flex justify-around md:hidden'>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <Home className='h-6 w-6' />
        </Button>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <Search className='h-6 w-6' />
        </Button>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <Bell className='h-6 w-6' />
        </Button>
        <Button variant='ghost' size='icon' className='hover:text-[#00b8aa]'>
          <Mail className='h-6 w-6' />
        </Button>
      </div>
    </div>
  );
}

function Tweet({ tweet }) {
  return (
    <div className='p-4 border-b border-gray-800 hover:bg-gray-900/50'>
      <div className='flex space-x-4'>
        <Avatar>
          <AvatarImage src={tweet.avatar} />
          <AvatarFallback>{tweet.author[0]}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <div>
              <span className='font-bold'>{tweet.author}</span>{" "}
              <span className='text-gray-500'>
                {tweet.handle} · {tweet.timestamp}
              </span>
            </div>
            <Button variant='ghost' size='icon' className='text-gray-500'>
              <MoreHorizontal className='h-5 w-5' />
            </Button>
          </div>
          <p className='mt-2 text-gray-200'>{tweet.content}</p>
          <div className='flex justify-between mt-4 text-gray-500 max-w-md'>
            <Button variant='ghost' size='sm' className='hover:text-[#00b8aa]'>
              <MessageCircle className='h-4 w-4 mr-2' />
              {tweet.replies}
            </Button>
            <Button variant='ghost' size='sm' className='hover:text-green-500'>
              <Repeat2 className='h-4 w-4 mr-2' />
              {tweet.retweets}
            </Button>
            <Button variant='ghost' size='sm' className='hover:text-red-500'>
              <Heart className='h-4 w-4 mr-2' />
              {tweet.likes}
            </Button>
            <Button variant='ghost' size='sm' className='hover:text-[#00b8aa]'>
              <Share className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
