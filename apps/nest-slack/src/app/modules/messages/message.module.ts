import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entity/message.entity";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { Channels } from "../channels/entities/channel.entity";
import { User } from "../users/entities/user.entity";
import { ChatGateway } from "./message.gateway";
import { AuthenticationModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports:[TypeOrmModule.forFeature([Message,Channels,User]),AuthenticationModule,UsersModule],
    providers:[MessageService,ChatGateway],
    controllers:[MessageController],
    exports:[MessageService]
})

export class MessageModule{}