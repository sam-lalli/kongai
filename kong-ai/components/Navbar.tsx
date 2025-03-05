"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import kongAI from "../public/KongAI.webp"

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

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4 flex flex-row justify-between items-center bg-black text-white ">
        <Link href="/" className=" flex flex-rowitems-center gap-x-2">
          <Image height="30" src={kongAI} alt="kongAI image"/>
          <h1 className="text-2xl font-bold font-mono">KongAI</h1>
        </Link>
        <div className="flex gap-x-6 text-lg items-center font-bold">
          {routes.map((route, idx) => (
            <Link
              key={idx}
              href={route.path}
              className={
                pathname === route.path ? "border-b-2 border-green-700" : ""
              }
            >
              {route.name}
            </Link>
          ))}

          <UserButton />
        </div>
      </div>
    </header>

  );
}

export default Navbar;