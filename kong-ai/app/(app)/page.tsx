"use client";

import React, { useState } from 'react'
import ThreadMessage from 'openai';


function ChatPage() {

  // State
  const [fetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);

  const fetchMessages = async () => {

  }


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