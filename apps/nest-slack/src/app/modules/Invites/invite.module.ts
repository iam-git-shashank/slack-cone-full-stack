import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invite } from "./entity/invites.entity";
import { InviteController } from "./invites.controller";
import { InviteService } from "./invites.service";
import { Workspace } from "../workspace/entities/workspace.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Invite, Workspace, User])],
  providers: [InviteService],
  controllers: [InviteController],
})
export class InvitesModule {}
