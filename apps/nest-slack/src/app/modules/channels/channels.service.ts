import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { User } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Channels } from "./entities/channel.entity";
import { Repository } from "typeorm";
import { Workspace } from "../workspace/entities/workspace.entity";
import { ChannelMember } from "../chanmember/entity/chanMem.entity";
import { WorkspaceMember } from "../workMembers/entity/workMember.entity";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channels)
    private readonly channelRepo: Repository<Channels>,
    @InjectRepository(Workspace)
    private readonly workRepo: Repository<Workspace>,

    @InjectRepository(ChannelMember)
    private readonly channelMemberRepository: Repository<ChannelMember>,

    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>
  ) {}
  async create(wid: number, createChannelDto: CreateChannelDto, user: User) {
    console.log(wid);
    const workspace = await this.workRepo.findOne({
      where: { id: wid },
      relations: ["members"],
    });
    console.log(user);
    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }
    const isMember = await this.workspaceMemberRepository.findOne({
      where: {
        workspace: { id: wid },
        user: { id: user.id },
      },
    });
    console.log(isMember);
    if (!isMember) {
      throw new ForbiddenException("You are not a member of this workspace");
    }

    const row = await this.channelRepo.create({
      ...createChannelDto,
      workspace,
      createdBy: user,
    });
    const savedChannel = await this.channelRepo.save(row);
    if (savedChannel.isPrivate) {
      await this.channelMemberRepository.save({
        user,
        channel: savedChannel,
      });
    }
    return row;
  }

  findAll(workspaceId:number,userId:number):Promise<Channels[]> {
    return this.channelRepo
      .createQueryBuilder("channel")
      .leftJoin("channel.members", "member")
      .leftJoin("channel.workspace", "workspace")
      .leftJoin("workspace.members", "workspaceMember")
      .where("channel.workspaceId = :workspaceId", { workspaceId })
      .andWhere("(channel.isPrivate = false OR member.userId = :userId)", {
        userId,
      })
      .andWhere("workspaceMember.userId = :userId", { userId })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
