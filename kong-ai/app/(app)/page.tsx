"use client";

import React, { useCallback, useEffect, useState } from 'react'
import ThreadMessage from 'openai';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userThreadAtom } from '@/atoms';

const POLLING_FREQUENCY_MS = 5000;


function ChatPage() {

  // Atom State
  const [userThread] = useAtom(userThreadAtom)

  // State
  const [fetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);

  console.log("messages", messages)
  console.log("userThread", userThread)

  const fetchMessages = useCallback(async () => {
    if (!userThread) return

    setFetching(true);

    try{
      const response = await axios.post<{
        success: boolean;
        error?: string;
        messages?: ThreadMessage[];
      }>("/api/message/list", {threadId: userThread.threadId});
  
      // Valdiation if success is false
      if(!response.data.success || !response.data.messages){
        console.error(response.data.error ?? "Unknown Error.");
        setFetching(false);
        return;
      }
  
      let newMessages = response.data.messages;

      console.log("New Message", newMessages)

  
      // Sort messages desc order
      newMessages = newMessages.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      })
      .filter(
        (message) =>
          message.content[0].type === "text" &&
          message.content[0].text.value.trim() !== ""
      );
  
      setMessages(newMessages)

    } catch (error) {
      console.error(error);
      setFetching(false);
      setMessages([]);
    }
  }, [userThread]); 

  useEffect(() => {
    const intervalId = setInterval(fetchMessages, POLLING_FREQUENCY_MS);

    // keep intervalId clean on unmounts
    return () => clearInterval(intervalId);
  }, [fetchMessages])

  // UI STARTS HERE
  return (
    <div className="w-screen h-screen flex flex-col bg-black text-white">

      <div className="flex-grow overflow-y-hidden p-8 space-y-2">
        {/* LOADING STATE */}
        {fetching && messages.length === 0 && (
          <div className="text-center font-bold">Fetching...</div>
        )}
        {/* NO MESSAGES */}
        {messages.length === 0 && !fetching && (
          <div className="text-center font-bold">No messages.</div>
        )}
      </div>

    </div>
  )
}

export default ChatPage