import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './modules/channels/channels.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Workspace } from './modules/workspace/entities/workspace.entity';
import { Channels } from './modules/channels/entities/channel.entity';
import { ChanMemeModule } from './modules/chanmember/chanMem.module';
import { InvitesModule } from './modules/Invites/invite.module';
import { WorkMemModule } from './modules/workMembers/workmem.module';
import { WorkspaceMember } from './modules/workMembers/entity/workMember.entity';
import { Invite } from './modules/Invites/entity/invites.entity';
import { ChannelMember } from './modules/chanmember/entity/chanMem.entity';
import { AuthenticationModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/messages/message.module';
import { Message } from './modules/messages/entity/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "Nxdatabase",
      entities: [User,Message, Workspace, Channels,WorkspaceMember,Invite,ChannelMember],
      synchronize: true,
    }),
    WorkspaceModule,
    UsersModule,
    ChannelsModule,
    ChanMemeModule,
    InvitesModule,
    WorkMemModule,
    AuthenticationModule,
    MessageModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
