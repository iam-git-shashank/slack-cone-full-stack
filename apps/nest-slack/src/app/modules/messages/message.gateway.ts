
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private connectedUsers = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.connectedUsers.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.connectedUsers.entries()].find(
      ([_, socket]) => socket.id === client.id
    )?.[0];
    if (userId) this.connectedUsers.delete(userId);
  }

  @SubscribeMessage("private_message")
  handlePrivateMessage(
    @MessageBody() data: { to: string; content: string },
    @ConnectedSocket() client: Socket
  ) {
    const senderId = client.handshake.query.userId as string;
    const recipientSocket = this.connectedUsers.get(data.to);
console.log(client)
    if (recipientSocket) {
      recipientSocket.emit("private_message", {
        from: senderId,
        content: data.content,
        timestamp: new Date(),
      });
    }
  }

  @SubscribeMessage("channel_message")
  handleChannelMessage(
    @MessageBody() data: { channelId: string; content: string },
    @ConnectedSocket() client: Socket
  ) {
    const senderId = client.handshake.query.userId as string;
console.log(client);

    // Broadcast to all channel members (in a real app, check permissions first)
    this.connectedUsers.forEach((socket) => {
      if (socket.handshake.query.channels?.includes(data.channelId)) {
        socket.emit("channel_message", {
          channelId: data.channelId,
          from: senderId,
          content: data.content,
          timestamp: new Date(),
        });
      }
    });
  }
}
