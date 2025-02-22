"use client";

import Navbar from "@/components/Navbar";
import axios from 'axios'
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AppLayout({ children }: Readonly<{children: React.ReactNode; }>) {

    const [userThread, setUserThread] = useState<User | null>(null);

    useEffect(() => {
        async function getUserThread() {
          try {
            const response = await axios.get<{
              success: boolean;
              message?: string;
              userThread: User;
            }>("/api/user-thread");
    
            if (!response.data.success || !response.data.userThread) {
              console.error(response.data.message ?? "Unknown error.");
              setUserThread(null);
              return;
            }
    
            setUserThread(response.data.userThread);
          } catch (error) {
            console.error(error);
            setUserThread(null);
          }
        }
    
        getUserThread();
      }, [setUserThread]);

    return (
        <div className="flex flex-col w-full h-full">
            <Navbar/>
            {children}
        </div>

    );
}

