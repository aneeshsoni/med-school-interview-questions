import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Home, BookOpen, Heart } from 'lucide-react';
import { PostHogProvider } from '../components/PostHogProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Med School Interview Questions",
  description: "Questions compiled from previous med school interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-background text-foreground flex flex-col"}>
        <PostHogProvider>
          {/* Top nav for desktop */}
          <nav className="hidden sm:flex fixed top-0 left-0 right-0 w-full justify-center py-3 px-2 bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200 dark:border-slate-800 z-40">
            <div className="flex gap-6 w-full max-w-2xl items-center justify-center">
              <Link href="/" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors rounded-md py-2 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center gap-2">
                <Home className="h-5 w-5" /> Questions
              </Link>
              <Link href="/resources" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors rounded-md py-2 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Resources
              </Link>
              <Link href="/donate" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors rounded-md py-2 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center gap-2">
                <Heart className="h-5 w-5" /> Donate
              </Link>
            </div>
          </nav>
          {/* Bottom nav for mobile */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden bg-white/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 shadow-t py-1">
            <div className="flex justify-around w-full max-w-lg mx-auto">
              <Link href="/" className="flex flex-col items-center justify-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <Home className="h-6 w-6 mb-0.5" />
                <span>Questions</span>
              </Link>
              <Link href="/resources" className="flex flex-col items-center justify-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <BookOpen className="h-6 w-6 mb-0.5" />
                <span>Resources</span>
              </Link>
              <Link href="/donate" className="flex flex-col items-center justify-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <Heart className="h-6 w-6 mb-0.5" />
                <span>Donate</span>
              </Link>
            </div>
          </nav>
          {/* Main content, with padding for mobile nav */}
          <div className="pb-14 sm:pb-0">
            {children}
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}