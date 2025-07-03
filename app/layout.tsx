import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

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
      <body className={inter.className}>
        <nav className="w-full flex justify-center py-4 bg-white/70 backdrop-blur-sm shadow-sm mb-4">
          <div className="flex gap-6">
            <Link href="/" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors">Questions</Link>
            <Link href="/resources" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors">Resources</Link>
            <Link href="/donate" className="font-semibold text-blue-600 hover:text-purple-600 transition-colors">Donate</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
