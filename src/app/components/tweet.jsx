"use client"

import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MoreHorizontal, Share } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toggleArticleLike } from "../api/user/functions";

export default function Tweet({ tweet, ref }) {
  const [likes, setLikes] = useState(tweet.likes)
  const [liked, setLiked] = useState(likes.includes(window.userId))
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

          <div className='flex justify-between mt-4 text-gray-500 max-w-md'>
            <Link href={`/feed/${tweet.id}#comment`}>
              <Button
                variant='ghost'
                size='sm'
                title='comments'
                className='hover:text-[#00b8aa]'
              >
                <MessageCircle className='h-4 w-4 mr-2' />
                {tweet.comments.length}
              </Button>
            </Link>

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
              onClick={() => {
                const host = new URL(window.location.href).host;
                const url = `https://${host}/feed/${tweet.id}`;
                if (navigator.share) {
                  navigator.share({
                    title: tweet.title,
                    url: url,
                  })
                } else {
                  navigator.clipboard.writeText(url)
                  toast.success("Link copied to clipboard")
                }
              }}
            >
              <Share className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
