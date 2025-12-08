"use client";

import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { status, data: session } = useSession();

  return (
    <div>
      <nav className="bg-[#FDD200] py-4">
        <div className="container flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center font-bold">
            <Link href="/">
              <div className="text-lg text-black ml-6 hover:font-black">
                SONG&apos;S PORTFOLIO
              </div>
            </Link>
          </div>

          {/* 메뉴 */}
          <div className="flex items-center font-bold">
            {/* ---------------- 조건부 UI ---------------- */}
            {status === "authenticated" ? (
              <>
                <Link href="/" className="text-black mr-5 hover:font-black">
                  Home
                </Link>
                <Link
                  href="/about_me"
                  className="text-black mr-5 hover:font-black"
                >
                  About Me
                </Link>
                <Link
                  href="/portfolio"
                  className="text-black mr-5 hover:font-black"
                >
                  Project
                </Link>
                <Link href="/team" className="text-black mr-5 hover:font-black">
                  Team
                </Link>

                <div className="flex items-center gap-3 ml-4">
                  <Image
                    src={session?.user?.image ?? "/default-avatar.svg"}
                    alt="user"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-black">{session?.user?.name}</span>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 ml-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
