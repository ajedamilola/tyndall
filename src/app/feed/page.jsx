"use client";

import React, { useEffect, useState } from "react";
import { getUserById } from "@/app/api/user/functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Bell,
  Home,
  Mail,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
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
import Tweet from "../components/tweet";
import Link from "next/link";
import MobileNav from "../components/mobileNav";

function Page() {
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("")

  async function act() {
    setContent("loading");
    let resp = await generateAIArticles({
      domains: ["Math", "Physics", "Chemistry"],
      limit: 10,
      level: "beginner",
    });
    setContent(resp);
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
              <div className='relative flex'>
                <Search className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />

                <Input
                  placeholder='What content would you like? min 5 characters'
                  className='pl-10 bg-gray-700 py-6 border-gray-800 rounded-lg w-full placeholder'
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <Button className="inline h-[50px]" disabled={search.length < 5} onClick={() => {
                  router.push(`/search/${search}`)
                }}>Search</Button>
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
                  A platform that is designed to make learning and studying easier by providing you highly informative and relevant content. Powered by <b>Generative AI</b>
                </p>
                <Button className='bg-white text-black hover:bg-gray-200'>
                  Get Started
                </Button>
              </div>
            </div>

            <div className='pb-16 md:pb-0'>
              {articles.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
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
              <h2 className='text-xl font-bold mb-4'>Your Fields</h2>
              <div className='flex flex-wrap gap-2'>
                {
                  userData?.preferences?.map((tag) => (
                    <Link key={tag} href={`/categories/${tag}`}>
                      <Button
                        variant='outline'
                        size='sm'
                        className='rounded-lg text-black/85'
                      >
                        #
                        {tag}
                      </Button></Link>
                  ))
                }
                <Button
                  variant='outline'
                  size='sm'
                  className='rounded-lg text-black/85'
                >
                  #TechNews
                </Button>
              </div>
            </div>
          </div>
        </div>

        <MobileNav />
      </div>


    </>
  );
}


export default Page;
