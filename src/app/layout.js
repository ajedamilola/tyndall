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
          <Toaster position='top-right' />
        </body>
      </SuperTokensProvider>
    </html>
  );
}
