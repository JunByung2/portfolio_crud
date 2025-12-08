import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/providers"; // 이름 변경 추천

export const metadata: Metadata = {
  title: "Song's portfolio",
  description: "This is Song's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
          <div className="ml-6 mr-6">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
