"use client";

import React, { useCallback, useEffect, useState } from 'react'
import ThreadMessage from 'openai';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userThreadAtom } from '@/atoms';
import toast from "react-hot-toast";


const POLLING_FREQUENCY_MS = 1000;


function ChatPage() {

  // Atom State
  const [userThread] = useAtom(userThreadAtom)

  // State
  const [fetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Fetch Mesages
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
        return;
      }
  
      let newMessages = response.data.messages;

      console.log("New Message", newMessages)

  
      // Sort messages desc order
      newMessages = newMessages.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
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
      setMessages([]);
    } finally{
      setFetching(false)
    }
  }, [userThread]); 

  // Polling new messages
  useEffect(() => {
    const intervalId = setInterval(fetchMessages, POLLING_FREQUENCY_MS);

    // keep intervalId clean on unmounts
    return () => clearInterval(intervalId);
  }, [fetchMessages])

  // Send message
  const sendMessage = async () => {
    if (!userThread || sending ) {
      toast.error("Failed to send message. Invalid state.");
      return;
    }

    setSending(true);

    try {
      const {
        data: { message: newMessages },
      } = await axios.post<{
        success: boolean;
        message?: ThreadMessage;
        error?: string;
      }>("/api/message/create", {
        message,
        threadId: userThread.threadId,
        fromUser: "true",
      });

      // Nessecary validation to allow for successful message setting
      if (!newMessages) {
        console.error("No message returned.");
        toast.error("Failed to send message. Please try again.");
        return;
      }

      setMessages((prev) => [...prev, newMessages]);
      setMessage("");
      toast.success("Message sent.");
  

    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
    setSending(false);
    }
    
  };

  // UI STARTS HERE
  return (
    <div className="w-screen h-[calc(100vh-64px)] flex flex-col bg-black text-white">

      <div className="flex-grow overflow-y-hidden p-8 space-y-2">
        {/* LOADING STATE */}
        {fetching && messages.length === 0 && (
          <div className="text-center font-bold">Fetching...</div>
        )}
        {/* NO MESSAGES */}
        {messages.length === 0 && !fetching && (
          <div className="text-center font-bold">No messages.</div>
        )}
        {/* LIST MESSAGES */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`px-4 py-2 mb-3 rounded-lg w-fit text-lg ${
              ["true", "True"].includes(
                (message.metadata as { fromUser?: string }).fromUser ?? ""
              )
                ? "bg-green-700 ml-auto"
                : "bg-gray-700"
            }`}
          >
            {message.content[0].type === "text"
              ? message.content[0].text.value
                  .split("\n")
                  .map((text, index) => <p key={index}>{text}</p>)
              : null}
          </div>
        ))}
      </div>
      {/* INPUT */}
      <div className='mt-auto p-4 bg-gray-800'>
        <div className='flex items-center bg-white p-2'>
          <input
          type='text'
          className='flex-grow bg-transparent focus:outline-none text-black'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            disabled={!userThread?.threadId || sending || !message.trim()}
            className='ml-4 bg-green-700 text-white px-4 py-2 rounded-full focus:outline-none disabled:bg-gray-400'
            onClick={sendMessage}
            >
              Send
            </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage