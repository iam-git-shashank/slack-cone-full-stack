import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from './entities/channel.entity';
import { Workspace } from '../workspace/entities/workspace.entity';
import { ChannelMember } from '../chanmember/entity/chanMem.entity';
import { WorkspaceMember } from '../workMembers/entity/workMember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channels,
      Workspace,
      ChannelMember,
      WorkspaceMember]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
