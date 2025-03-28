"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { Message as ThreadMessage } from "openai/resources/beta/threads/messages.mjs"; 
import axios from 'axios';
import { useAtom } from 'jotai';
import { assistantAtom, userThreadAtom } from '@/atoms';
import toast from "react-hot-toast";
import { Run } from 'openai/resources/beta/threads/runs/runs.mjs';
import useServiceWorker from "@/hooks/useServiceWorker";
import NotificationModal from "@/components/NotificationModal";


const POLLING_FREQUENCY_MS = 3000;


function ChatPage() {

  // Atom State
  const [userThread] = useAtom(userThreadAtom)
  const [assistant] = useAtom(assistantAtom)

  // State
  const [fetching, setFetching] = useState(false);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pollingRun, setPollingRun] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false)


  // Hooks
  useServiceWorker();

  // Check for notifications
  useEffect(() => {
    if ("Notification" in window) {
      setIsNotificationModalVisible(Notification.permission === "default");
      console.log("Notification permission:", Notification.permission);
    }
  }, []);

  const handleNotificationModalClose = (didConstent: boolean) => {
    setIsNotificationModalVisible(false);

    if (didConstent) {
      toast.success("You will now receive notifications.");
    }
  };

  // Save Notification subscription
  const saveSubscription = useCallback(async () => {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    try {
      const response = await axios.post("/api/subscription", subscription);

      if (!response.data.success) {
        console.error(response.data.message ?? "Unknown error.");
        toast.error("Failed to save subscription.");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save subscription.");
    }
  }, []);

  useEffect(() => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      if (Notification.permission === "granted") {
        saveSubscription();
      }
    }
  }, [saveSubscription]);

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

  // Start Run 
  const startRun = async (
    threadId: string, 
    assistantId: string
  ): Promise<string> => {
    try {
      const {
        data: { success, run, error },
      } = await axios.post<{
        success: boolean;
        error?: string;
        run?: Run;
      }>("api/run/create", {
        threadId,
        assistantId,
      });

      if (!success || !run) {
        console.error(error);
        toast.error("Failed to start run.");
        return "";
      }

      return run.id;

    } catch (error) {
      console.error(error);
      toast.error("Failed to start run.");
      return "";
    }
  };

  // Poll Run
  const pollRunStatus = async (threadId: string, runId: string) => {
    setPollingRun(true);

    const intervalId = setInterval(async () => {
      try {
        const {
          data: { run, success, error },
        } = await axios.post<{
          success: boolean;
          error?: string;
          run?: Run;
        }>("api/run/retrieve", {
          threadId,
          runId,
        });

        if (!success || !run) {
          console.error(error);
          toast.error("Failed to poll run status.");
          return;
        }

        console.log("run", run);

        if (run.status === "completed") {
          clearInterval(intervalId);
          setPollingRun(false);
          fetchMessages();
          return;
        } else if (run.status === "failed") {
          clearInterval(intervalId);
          setPollingRun(false);
          toast.error("Run failed.");
          return;
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to poll run status.");
        clearInterval(intervalId);
      }
    }, POLLING_FREQUENCY_MS);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  };

  // Send message
  const sendMessage = async () => {
    if (!userThread || sending || !assistant ) {
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

      // start run
      const runId = await startRun(userThread.threadId, assistant.assistantId)

      // don't start polling if no runId is returned
      if (!runId) {
        toast.error("Failed to start run");
        return;
      }

      // start polling
      pollRunStatus(userThread.threadId, runId);

    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
    
  };

  // UI STARTS HERE //
  return (
    <>
    <div className="w-screen h-[calc(100vh-64px)] flex flex-col bg-black text-white">

      <div className="flex-grow overflow-y-scroll p-8 space-y-2">
        {/* LOADING STATE */}
        {fetching && messages.length === 0 && (
          <div className="text-center font-bold">Gathering Bananas...</div>
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
      <div className='mt-auto p-4 rounded-lg'>
        <div className='flex items-center bg-white p-2 rounded-lg'>
          <input
          type='text'
          className='flex-grow bg-transparent focus:outline-none text-black'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            disabled={!userThread?.threadId || !assistant || sending || !message.trim()}
            className='ml-4 bg-green-700 text-white px-4 py-2 rounded-full focus:outline-none disabled:bg-gray-400'
            onClick={sendMessage}
            >
              {sending ? "Sending..." : pollingRun ? "Awaking Kong..." : "Send"}
            </button>
        </div>
      </div>
    </div>

    {isNotificationModalVisible && (
      <NotificationModal
        onRequestClose={handleNotificationModalClose}
        saveSubscription={saveSubscription}
      />
    )}
    </>
  );
}

export default ChatPage
