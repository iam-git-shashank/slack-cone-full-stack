// src/pages/chat.tsx
import React, { useState } from "react";
import { useChatSocket } from "../hooks/chathook";
import { Input, Button, List } from "antd";

export const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, sendPrivateMessage, sendChannelMessage } = useChatSocket();

  const handleSend = () => {
    // Example usage
    sendChannelMessage("channel-1", input);
    setInput("");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Chat</h2>
      <List
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item>
            <strong>{msg.from}:</strong> {msg.content}
          </List.Item>
        )}
        style={{ maxHeight: 300, overflow: "auto", marginBottom: 16 }}
      />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%" }}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>

    </div>
  );
};
