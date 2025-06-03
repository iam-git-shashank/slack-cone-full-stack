import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invite } from "./entity/invites.entity";
import { InviteController } from "./invites.controller";
import { InviteService } from "./invites.service";

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
  providers: [InviteService],
  controllers: [InviteController],
})
export class InvitesModule {}