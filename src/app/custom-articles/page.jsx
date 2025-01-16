import { Button } from "@/components/ui/button"
import { HardHat, Github, Twitter, Mail, Home } from 'lucide-react'
import Link from "next/link"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen w-full bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto flex items-center justify-center">
          <HardHat className="w-16 h-16 text-yellow-500" />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Under Construction
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            We're working hard to bring you something amazing. Check back soon!
          </p>
        </div>

        {/* Contact Button */}
        <div className="flex flex-row justify-center gap-4">
          <a className="inline-block" href="mailto:ajedamilola2005@gmail.com">
            <Button variant="secondary">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </a>
          <Link href={"/feed"}>
            <Button variant="secondary"><Home className="mr-2 h-4 w-4" /> Home</Button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-gray-400">
          <a
            href="https://github.com/ajedamilola/tyndall"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Team Excellence. All rights reserved.
        </p>
      </div>
    </div >
  )
}

