"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import kongAI from "../public/KongAI.png"

const routes = [
  {
    name: "Chat",
    path: "/chat",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const [displayText, setDisplayText] = useState("");
  const title = "KongAI";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= title.length) {
        setDisplayText(title.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, []); // Run only on initial page load

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4 flex flex-row justify-between items-center bg-black text-white ">
        <Link href="/" className=" flex flex-rowitems-center gap-x-2">
          <Image height="30" src={kongAI} alt="kongAI image"/>
          <h1 className="text-2xl font-bold font-mono">
            <span className={`ml-1 animate-blink ${isVisible ? "border-r-2 border-white" : "border-r-0"}`}>{displayText}</span>
          </h1>
        </Link>
        <div className="flex gap-x-6 text-lg items-center font-bold">
          {isSignedIn ? (
            routes.map((route, idx) => (
              <Link
                key={idx}
                href={route.path}
                className={
                  pathname === route.path ? "border-b-2 border-green-700" : ""
                }
              >
                {route.name}
              </Link>
            ))
          ) : (
            <>
              <Link href="/sign-up">Sign up</Link>
              <Link href="/sign-in">Sign in</Link>
            </>
          )}
          {isSignedIn && <UserButton />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
