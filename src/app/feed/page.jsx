"use client";

import React, { useEffect, useState } from "react";
import { generateMoreArticles, getUserById, toggleArticleLike } from "@/app/api/user/functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Bell,
  Home,
  Mail,
  Search,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  LogOut,
  Star,
  Book,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  generateAIArticleContent,
  generateAIArticles,
  getArticles,
} from "../api/article/functions";
import { useInView } from "react-intersection-observer";
import { signOut } from "supertokens-web-js/recipe/session";
import SideBar from "./components/SideBar";
import Loader from "@/components/Loader";
import SessionValidator from "../components/sessionValidator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { set } from "mongoose";
import { Block } from "notiflix";
import Link from "next/link";

function Page() {
  const [content, setContent] = useState("");
  const [openLogOutModal, setOpenLogOutModal] = useState(false);

  async function act() {
    setContent("loading");
    let resp = await generateAIArticles({
      domains: ["Math", "Physics", "Chemistry"],
      limit: 10,
      level: "beginner",
    });
    setContent(resp);
  }

  async function handleLogout() {
    await signOut();
    router.replace("/auth"); // or to wherever your logic page is
  }

  const { ref, inView } = useInView();
  const [articles, setArticles] = useState([])
  const [canGetMore, setCanGetMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchNextPage = async () => {
    setPage(page + 1)
    //This will still use previous pages bcus the state is not updated yet
    const moreArticles = await getArticles({
      userId: window.userId,
      page,
    })
    if (moreArticles.err) {
      return toast.error(moreArticles.err)
    }
    setArticles([...articles, ...moreArticles.articles])
    setCanGetMore(moreArticles.canLoadMore)
  };

  useEffect(() => {
    if (inView && canGetMore) {
      fetchNextPage();
    }
  }, [inView, page]);

  const [userData, setUserData] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function getUserData() {
    console.log({ data: window.userId })
    setLoading(true)
    const data = await getUserById(window.userId)
    if (data) {
      const firstArticles = await getArticles({
        userId: window.userId,
        page: 1,
      })
      if (firstArticles.err) {
        return toast.error(firstArticles.err)
      }
      setPage(2)
      setArticles(firstArticles.articles)
      setCanGetMore(firstArticles.canLoadMore)
      setUserData(data)
    } else {
      await signOut()
      router.replace("/auth")
    }
    setLoading(false)
  }
  useEffect(() => {
    //Using a delay so the user id would be in
    setTimeout(() => {
      getUserData()
    }, 200)
  }, [])

  if (loading) {
    return <div className="flex-1 flex items-center justify-center h-screen bg-gray-800 text-white">
      <SessionValidator />
      <Loader />
    </div>
  }

  return (
    <>
      <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
        <SessionValidator />

        {/* Left Sidebar - Hidden on mobile, icon-only on tablet, full on desktop */}
        <SideBar user={userData} />

        {/* Main Content */}
        <div className='flex-1 border-r border-gray-800 pb-16 md:pb-0'>
          <div className='sticky top-0 bg-[#1c1c1c]/80 backdrop-blur-sm z-10'>
            <div className='flex justify-between p-4 border-b border-gray-800'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-[#00B8A9]' />
                <span className='text-xl font-semibold font-manrope'>
                  Tyndall
                </span>
              </div>
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

          {/* Let this action be dismissed */}
          <div className='divide-y divide-gray-800'>
            <div className='p-4 border-b border-gray-800'>
              <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>
                  Welcome to Tyndall
                </h2>
                <p className='text-gray-400'>
                  Get access to a wide range of AI Generated resources to help you learn and grow.
                </p>
                <Button className='bg-white text-black hover:bg-gray-200'>
                  Get Started
                </Button>
              </div>
            </div>

            <div className='pb-16 md:pb-0'>
              {articles.map((tweet) => (
                <Tweet key={Math.random()} tweet={tweet} />
              ))}

              <div ref={ref} className='flex justify-center p-4'>
                {inView && canGetMore && (
                  <div className='size-20 border-2 border-[#00b8aa] border-t-transparent rounded-full animate-spin' />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile and tablet */}
        <div className='hidden lg:block w-80 p-4'>
          <div className='sticky top-4 space-y-4'>
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
    </>
  );
}

function Tweet({ tweet, ref }) {
  const [likes, setLikes] = useState(tweet.likes)
  const [liked, setLiked] = useState(likes.includes(window.userId))
  const [comments, setComments] = useState(tweet.comments)
  return (
    <div
      ref={ref}
      className='p-4 border-b border-gray-800 hover:bg-gray-800/50 block' id={tweet.title}

    >
      <div className='flex space-x-4' >
        {/* <Avatar>
          <AvatarImage src={tweet.avatar} />
          <AvatarFallback>{tweet.author[0]}</AvatarFallback>
        </Avatar> */}
        <div className='flex-1'>
          <Link href={`/feed/${tweet.id}`}>
            <div className='flex items-center justify-between'>
              <div>
                <span className='font-bold'>{tweet.title}</span>{" "}
                <span className='text-gray-500'>
                  {tweet.timestamp}
                </span>
              </div>

              <Button variant='ghost' size='icon' className='text-gray-500'>
                <MoreHorizontal className='h-5 w-5' />
              </Button>
            </div>

            <p className='mt-2 text-gray-200'>{tweet.summary}</p>
          </Link>

          <div className='flex justify-between mt-4 text-gray-500 max-w-md' onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
            <Button
              variant='ghost'
              size='sm'
              title='comments'
              className='hover:text-[#00b8aa]'
              onClick={async e => {
                e.stopPropagation()
              }}
            >
              <MessageCircle className='h-4 w-4 mr-2' />
              {tweet.comments.length}
            </Button>

            <Button
              variant='ghost'
              size='sm'
              title='likes'
              className='hover:text-red-500'
              onClick={async (e) => {
                e.stopPropagation()
                setLiked(!liked)
                const newArticle = await toggleArticleLike({ articleId: tweet.id, userId: window.userId })
                if (newArticle.err) {
                  return toast.error(newArticle.err)
                }
                setLikes(newArticle.likes)
              }}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? "text-red-500" : ""}`} />
              {likes.length}
            </Button>

            <Button
              variant='ghost'
              size='sm'
              className='hover:text-[#00b8aa]'
              title='share'
            >
              <Share className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
