import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../users/entities/user.entity";
import { MessageService } from "./message.service";
import { authGuard } from "../auth/guards/auth.guard";

@Controller("chat")
export class MessageController {
  constructor(private readonly chatService: MessageService) {}
  @UseGuards(authGuard)
  @Post()
  async create(
    @GetUser() user: User,
    @Body() body: { content: string; channelId?: number; recipientId?: number }
  ) {
    return this.chatService.sendMessage(user.id, body.content, {
      channelId: body.channelId,
      recipientId: body.recipientId,
    });
  }

  @Get("channel/:channelId")
  async getChannelMessages(
    @Param("channelId") channelId: number,
    @Query("limit") limit: number = 50
  ) {
    return this.chatService.getChannelMessages(channelId, limit);
  }

  @Get("private/:userId")
  async getPrivateMessages(
    @GetUser() user: User,
    @Param("userId") otherUserId: number,
    @Query("limit") limit: number = 50
  ) {
    return this.chatService.getPrivateChat(user.id, otherUserId, limit);
  }
}
