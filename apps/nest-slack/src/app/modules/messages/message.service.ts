import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entity/message.entity";
import { Repository } from "typeorm";
import { Channels } from "../channels/entities/channel.entity";
import { SendMessageDto } from "./dto/send-message.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Channels)
    private channelRepository: Repository<Channels>,
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
    
  ) {}

  async sendMessage(
    senderId: number,
    content: string,
    options: { channelId?: number; recipientId?: number }
  ): Promise<Message> {
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });
    if (!sender) throw new NotFoundException("Sender not found");

    const message = this.messageRepository.create({
      content,
      sender,
      ...(options.channelId && {
        channel: { id: options.channelId },
      }),
      ...(options.recipientId && {
        recipient: { id: options.recipientId },
      }),
    });

    return this.messageRepository.save(message);
  }

  // Get channel messages
  async getChannelMessages(
    channelId: number,
    limit: number = 50
  ): Promise<Message[]> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    if (!channel) throw new NotFoundException("Channel not found");

    return this.messageRepository.find({
      where: { channel: { id: channelId } },
      relations: ["sender", "recipient"],
      order: { createdAt: "DESC" },
      take: limit,
    });
  }

  // Get private chat history
  async getPrivateChat(
    userId1: number,
    userId2: number,
    limit: number = 50
  ): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId1 }, recipient: { id: userId2 } },
        { sender: { id: userId2 }, recipient: { id: userId1 } },
      ],
      relations: ["sender", "recipient"],
      order: { createdAt: "DESC" },
      take: limit,
    });
  }
}