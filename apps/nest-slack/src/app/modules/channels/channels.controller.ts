import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { User } from "../users/entities/user.entity";

@Controller("channels")
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  create(
    @Body("dto") createChannelDto: CreateChannelDto,
    @Body("user") user: User,
    @Body("wid") wid: number
  ) {
    return this.channelsService.create(wid, createChannelDto, user);
  }

  @Get()
  findAll() {
    return "this.channelsService.findAll(workspaceId,userId)";
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.channelsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.channelsService.remove(+id);
  }
}
