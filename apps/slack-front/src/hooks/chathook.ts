// src/hooks/useChatSocket.ts
import { useEffect, useState } from "react";
import { socket } from "../Socket";

export function useChatSocket() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Handle private messages
    socket.on("private_message", (message) => {
      console.log("Private message:", message);
      setMessages((prev) => [...prev, message]);
    });

    // Handle channel messages
    socket.on("channel_message", (message) => {
      console.log("Channel message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("private_message");
      socket.off("channel_message");
    };
  }, []);

  const sendPrivateMessage = (to: string, content: string) => {
    socket.emit("private_message", { to, content });
  };

  const sendChannelMessage = (channelId: string, content: string) => {
    socket.emit("channel_message", { channelId, content });
  };

  return {
    messages,
    sendPrivateMessage,
    sendChannelMessage,
  };
}
