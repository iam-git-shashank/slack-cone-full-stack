// src/socket.ts
import { io } from "socket.io-client";

const userId = "user-id-123"; // Replace with real user ID (from auth)
const channels = ["channel-1", "channel-2"]; // Replace with real channel IDs

export const socket = io("http://localhost:3000", {
  query: {
    userId,
    channels: JSON.stringify(channels),
  },
});
