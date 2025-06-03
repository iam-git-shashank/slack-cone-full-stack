import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Workspace } from './entities/workspace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from '../channels/entities/channel.entity';
import { WorkspaceMember } from '../workMembers/entity/workMember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Channels,WorkspaceMember])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
