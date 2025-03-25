"use client";

import Navbar from "@/components/Navbar";
import axios from 'axios'
import { Assistant, UserThread } from "@prisma/client";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { assistantAtom, userThreadAtom } from "@/atoms";
import toast, { Toaster } from "react-hot-toast";
import useServiceWorker from "@/hooks/useServiceWorker";

export default function AppLayout({ children }: Readonly<{children: React.ReactNode; }>) {

    // Atom state
    const [, setUserThread] = useAtom(userThreadAtom);
    const [assistant, setAssistant] = useAtom(assistantAtom);

    // Hooks
    useServiceWorker();

    useEffect(() => {
      if (assistant) return;
  
      async function getAssistant() {
        try {
          const response = await axios.get<{
            success: boolean;
            message?: string;
            assistant: Assistant;
          }>("/api/assistant");
  
          if (!response.data.success || !response.data.assistant) {
            console.error(response.data.message ?? "Unknown error.");
            toast.error("Failed to fetch assistant.");
            setAssistant(null);
            return;
          }
  
          setAssistant(response.data.assistant);
        } catch (error) {
          console.error(error);
          setAssistant(null);
        }
      }
  
      getAssistant();
    }, [assistant, setAssistant]);

    useEffect(() => {
        async function getUserThread() {
          try {
            const response = await axios.get<{
              success: boolean;
              message?: string;
              userThread: UserThread;
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
            <Toaster />
        </div>

    );
}

