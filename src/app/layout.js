import { Inter } from "next/font/google";
import "./globals.css";
import { SuperTokensProvider } from "./components/supertokensProvider";
import { Toaster } from "@/components/ui/sonner";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tyndall",
  description: "Your go to platform for research and academics",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <SuperTokensProvider>
        <body
          className={`${inter.variable} ${interMono.variable} antialiased font-inter`}
        >
          {children}
          <Toaster position='top-right' richColors />
          {/* The reason i am putting these classes here is bcause tailwind does not know dynamic classes like the AI generated onces. and my AI makes uses of dynamic classes */}
          <div className="hidden m-0 m-1 m-2 m-3 m-4 m-5 m-6 m-8 m-10 m-12 m-16 m-20 m-24 m-32 m-40 m-48 m-56 m-64 mx-auto mx-0 mx-1 mx-2 mx-3 mx-4 mx-5 mx-6 mx-8 mx-10 mx-12 mx-16 mx-20 mx-24 mx-32 my-0 my-1 my-2 my-3 my-4 my-5 my-6 my-8 my-10 my-12 my-16 my-20 my-24 my-32 mt-0 mt-1 mt-2 mt-3 mt-4 mt-5 mt-6 mt-8 mt-10 mt-12 mt-16 mt-20 mt-24 mt-32 mb-0 mb-1 mb-2 mb-3 mb-4 mb-5 mb-6 mb-8 mb-10 mb-12 mb-16 mb-20 mb-24 mb-32 ml-0 ml-1 ml-2 ml-3 ml-4 ml-5 ml-6 ml-8 ml-10 ml-12 ml-16 ml-20 ml-24 ml-32 mr-0 mr-1 mr-2 mr-3 mr-4 mr-5 mr-6 mr-8 mr-10 mr-12 mr-16 mr-20 mr-24 mr-32 p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-8 p-10 p-12 p-16 p-20 p-24 p-32 px-0 px-1 px-2 px-3 px-4 px-5 px-6 px-8 px-10 px-12 px-16 px-20 px-24 px-32 py-0 py-1 py-2 py-3 py-4 py-5 py-6 py-8 py-10 py-12 py-16 py-20 py-24 py-32 pt-0 pt-1 pt-2 pt-3 pt-4 pt-5 pt-6 pt-8 pt-10 pt-12 pt-16 pt-20 pt-24 pt-32 pb-0 pb-1 pb-2 pb-3 pb-4 pb-5 pb-6 pb-8 pb-10 pb-12 pb-16 pb-20 pb-24 pb-32 pl-0 pl-1 pl-2 pl-3 pl-4 pl-5 pl-6 pl-8 pl-10 pl-12 pl-16 pl-20 pl-24 pl-32 pr-0 pr-1 pr-2 pr-3 pr-4 pr-5 pr-6 pr-8 pr-10 pr-12 pr-16 pr-20 pr-24 pr-32 underline"></div>
        </body>
      </SuperTokensProvider>
    </html>
  );
}
