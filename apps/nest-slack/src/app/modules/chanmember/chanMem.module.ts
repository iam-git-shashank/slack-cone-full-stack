import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelMember } from "./entity/chanMem.entity";
import { ChanMemService } from "./chanMem.service";
import { ChanMemController } from "./chanMem.controller";

@Module({
    imports:[TypeOrmModule.forFeature([ChannelMember])],
    providers:[ChanMemService],
    controllers:[ChanMemController]
})
export class ChanMemeModule{}