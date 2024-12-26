"use client";
import { generateMoreArticles } from "@/app/api/user/functions";
import Logout from "@/app/components/logout";
import SessionValidator from "@/app/components/sessionValidator";
import React, { useEffect, useState } from "react";
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

import {
  generateAIArticleContent,
  generateAIArticles,
} from "../api/article/functions";
import { useInView } from "react-intersection-observer";

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

  // This is just the whole idea of the Intersection observer...I really don't knw why my own content is not fetching sha...But this is the way it works sha....Also check the footer section for mobile..make we see how e go be

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
    {
      id: 6,
      author: "Cloud Expert",
      handle: "@cloudguru",
      content:
        "Serverless architecture is revolutionizing how we build applications. Here's why you should consider it for your next project.",
      timestamp: "10h",
      likes: 567,
      retweets: 123,
      replies: 45,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      author: "Security Now",
      handle: "@securitynow",
      content:
        "Critical vulnerability found in popular npm package. Update your dependencies ASAP!",
      timestamp: "11h",
      likes: 1876,
      retweets: 902,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      author: "Mobile Dev Tips",
      handle: "@mobiledevtips",
      content:
        "10 performance optimization techniques for React Native apps that you need to know 📱",
      timestamp: "12h",
      likes: 654,
      retweets: 234,
      replies: 89,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      author: "Database Pro",
      handle: "@dbpro",
      content:
        "MongoDB vs PostgreSQL: Making the right choice for your project. Thread 🧵",
      timestamp: "13h",
      likes: 987,
      retweets: 432,
      replies: 156,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      author: "Frontend Focus",
      handle: "@frontendfocus",
      content:
        "New CSS Container Queries are changing the game for responsive design. Here's how to use them effectively.",
      timestamp: "14h",
      likes: 1432,
      retweets: 567,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 11,
      author: "Python Master",
      handle: "@pythonmaster",
      content:
        "Async/await patterns in Python that will make your code more efficient and readable 🐍",
      timestamp: "15h",
      likes: 876,
      retweets: 345,
      replies: 123,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 12,
      author: "DevOps Daily",
      handle: "@devopsday",
      content:
        "Kubernetes best practices: A comprehensive guide to managing your clusters effectively 🎯",
      timestamp: "16h",
      likes: 2341,
      retweets: 987,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 13,
      author: "JavaScript News",
      handle: "@jsnews",
      content:
        "TypeScript 5.0 features that will boost your productivity. Let's dive in! 🚀",
      timestamp: "17h",
      likes: 1654,
      retweets: 765,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 14,
      author: "Code Quality",
      handle: "@codequality",
      content:
        "Clean Code principles that every developer should follow. A thread on writing maintainable code 🧵",
      timestamp: "18h",
      likes: 1987,
      retweets: 876,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 15,
      author: "UI/UX Tips",
      handle: "@uiuxtips",
      content:
        "Design systems are crucial for scaling your product. Here's how to build one from scratch 🎨",
      timestamp: "19h",
      likes: 1234,
      retweets: 543,
      replies: 187,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 16,
      author: "Blockchain Dev",
      handle: "@blockchaindev",
      content:
        "Smart contract security: Common vulnerabilities and how to prevent them 🔒",
      timestamp: "20h",
      likes: 2198,
      retweets: 876,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 17,
      author: "ML Engineer",
      handle: "@mlengineer",
      content:
        "Deep learning frameworks comparison: PyTorch vs TensorFlow in 2024 🤖",
      timestamp: "21h",
      likes: 1876,
      retweets: 765,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 18,
      author: "API Design",
      handle: "@apidesign",
      content:
        "RESTful API design principles that will make your endpoints more intuitive and maintainable",
      timestamp: "22h",
      likes: 1543,
      retweets: 654,
      replies: 198,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 19,
      author: "Testing Pro",
      handle: "@testingpro",
      content:
        "Unit testing strategies that will save you hours of debugging time ⏱️",
      timestamp: "23h",
      likes: 987,
      retweets: 432,
      replies: 156,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 20,
      author: "Git Master",
      handle: "@gitmaster",
      content:
        "Advanced Git workflows that will improve your team's collaboration 🤝",
      timestamp: "1d",
      likes: 1765,
      retweets: 876,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 21,
      author: "Performance Guru",
      handle: "@perfguru",
      content:
        "Web vitals optimization techniques that will boost your lighthouse score 📈",
      timestamp: "1d",
      likes: 2341,
      retweets: 987,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 22,
      author: "System Design",
      handle: "@sysdesign",
      content:
        "Microservices vs Monolith: Making the right architectural decision for your project",
      timestamp: "1d",
      likes: 1987,
      retweets: 876,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 23,
      author: "Docker Expert",
      handle: "@dockerpro",
      content:
        "Container orchestration best practices for production environments 🐳",
      timestamp: "1d",
      likes: 1654,
      retweets: 765,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 24,
      author: "Cloud Security",
      handle: "@cloudsec",
      content:
        "AWS security configurations that you should implement right now ☁️",
      timestamp: "1d",
      likes: 2198,
      retweets: 987,
      replies: 456,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 25,
      author: "React Native Dev",
      handle: "@rndev",
      content:
        "Cross-platform development tips that will save you time and effort 📱",
      timestamp: "1d",
      likes: 1432,
      retweets: 654,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 26,
      author: "GraphQL Expert",
      handle: "@graphqlexp",
      content:
        "Schema design patterns that will make your GraphQL API more efficient",
      timestamp: "1d",
      likes: 1876,
      retweets: 765,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 27,
      author: "Vue Master",
      handle: "@vuemaster",
      content:
        "Vue 3 Composition API patterns that will improve your component logic 💚",
      timestamp: "1d",
      likes: 1543,
      retweets: 654,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 28,
      author: "CSS Wizard",
      handle: "@csswizard",
      content: "Advanced CSS Grid techniques for complex layouts 🎨",
      timestamp: "1d",
      likes: 1987,
      retweets: 876,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 29,
      author: "Backend Pro",
      handle: "@backendpro",
      content:
        "Node.js performance optimization techniques for high-traffic applications",
      timestamp: "1d",
      likes: 2341,
      retweets: 987,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 30,
      author: "Data Science",
      handle: "@datascience",
      content: "Data visualization best practices for better insights 📊",
      timestamp: "1d",
      likes: 1765,
      retweets: 765,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 31,
      author: "iOS Developer",
      handle: "@iosdev",
      content: "SwiftUI tips and tricks for building beautiful iOS apps 🍎",
      timestamp: "2d",
      likes: 1432,
      retweets: 654,
      replies: 198,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 32,
      author: "Android Guru",
      handle: "@androidguru",
      content: "Jetpack Compose patterns for modern Android development 🤖",
      timestamp: "2d",
      likes: 1876,
      retweets: 765,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 33,
      author: "Web Security",
      handle: "@websecurity",
      content: "OWASP top 10 vulnerabilities and how to prevent them 🔒",
      timestamp: "2d",
      likes: 2198,
      retweets: 987,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 34,
      author: "Flutter Dev",
      handle: "@flutterdev",
      content:
        "State management solutions in Flutter: A comprehensive comparison 💙",
      timestamp: "2d",
      likes: 1543,
      retweets: 654,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 35,
      author: "Redis Expert",
      handle: "@redisexp",
      content: "Caching strategies that will improve your app's performance ⚡",
      timestamp: "2d",
      likes: 1987,
      retweets: 876,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 36,
      author: "AWS Solutions",
      handle: "@awssolutions",
      content: "Serverless patterns for scalable cloud applications ☁️",
      timestamp: "2d",
      likes: 2341,
      retweets: 987,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 37,
      author: "Rust Developer",
      handle: "@rustdev",
      content: "Memory safety patterns in Rust that prevent common bugs 🦀",
      timestamp: "2d",
      likes: 1765,
      retweets: 765,
      replies: 234,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 38,
      author: "Go Expert",
      handle: "@goexpert",
      content: "Concurrency patterns in Go for high-performance systems",
      timestamp: "2d",
      likes: 1876,
      retweets: 876,
      replies: 345,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 39,
      author: "ML Ops",
      handle: "@mlops",
      content:
        "Machine learning deployment strategies for production environments 🤖",
      timestamp: "2d",
      likes: 2198,
      retweets: 987,
      replies: 432,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];
  const { ref, inView } = useInView();
  const [displayedTweets, setDisplayedTweets] = useState(5);

  const fetchNextPage = () => {
    const nextBatch = displayedTweets + 5;

    if (nextBatch <= tweets.length) {
      setDisplayedTweets(nextBatch);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log("Tweet is in view");
      fetchNextPage();
    }
  }, [inView, displayedTweets]);

  //  <Logout />;
  return (
    <div className='flex min-h-screen bg-[#1c1c1c] text-white relative'>
      {/* Left Sidebar - Hidden on mobile, icon-only on tablet, full on desktop */}
      <div className='hidden md:flex flex-col lg:w-64 md:w-16 p-4 border-r border-gray-800 sticky top-0 h-screen'>
        <div className='flex flex-col items-center lg:items-start space-y-4'>
          <Avatar className='h-12 w-12'>
            <AvatarImage src='/placeholder.svg?height=48&width=48' />
            <AvatarFallback className='text-black'>JD</AvatarFallback>
          </Avatar>
          <div className='hidden lg:block'>
            <h2 className='font-bold '>John Doe</h2>
            <p className='text-gray-500'>@johndoe</p>
          </div>
        </div>{" "}
        {/* <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-[#00B8A9]' />
          <span className='text-xl font-semibold font-manrope'>Tyndall</span>
        </div> */}
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
              <Tweet
                key={tweet.id}
                ref={ref}
                tweet={tweets.slice(0, displayedTweets)}
              />
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

function Tweet({ tweet, ref }) {
  return (
    <div
      ref={ref}
      className='p-4 border-b border-gray-800 hover:bg-gray-800/50'
    >
      <div className='flex space-x-4'>
        {/* <Avatar>
          <AvatarImage src={tweet.avatar} />
          <AvatarFallback>{tweet.author[0]}</AvatarFallback>
        </Avatar> */}
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
