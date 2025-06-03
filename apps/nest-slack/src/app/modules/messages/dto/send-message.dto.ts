import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

// chat/dto/send-message.dto.ts
export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()

  recipientId?: number; // For 1:1

  @IsOptional()

  channelId?: number; // For channels
}
