import { Inter } from "next/font/google";
import "./globals.css";
import { SuperTokensProvider } from "./components/supertokensProvider";

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
    <html lang="en">
      <SuperTokensProvider>
        <body
          className={`${inter.variable} ${interMono.variable} antialiased`}
        >
          {children}
        </body>
      </SuperTokensProvider>
    </html>
  );
}
