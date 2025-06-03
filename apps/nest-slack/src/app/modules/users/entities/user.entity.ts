import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Workspace } from "../../workspace/entities/workspace.entity";
import { Channels } from "../../channels/entities/channel.entity";
import { WorkspaceMember } from "../../workMembers/entity/workMember.entity";
import { Invite } from "../../Invites/entity/invites.entity";
import { ChannelMember } from "../../chanmember/entity/chanMem.entity";
import { Message } from "../../messages/entity/message.entity";

@Entity("slack_users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({unique:true})
  email!: string;
  @Column()
  username!: string;
  @Column()
  password!: string;

  @OneToMany(() => WorkspaceMember, (member) => member.user)
  workspaceMemberships!: WorkspaceMember[];

  @OneToMany(() => Workspace, (workspace) => workspace.createdBy)
  createdWorkspaces!: Workspace[];

  @OneToMany(() => Channels, (channels) => channels.createdBy)
  channelCreated!: Channels[];

  @OneToMany(() => Invite, (invite) => invite.createdBy)
  sentInvites!: Invite[];

  @OneToMany(() => ChannelMember, (member) => member.user)
  channelMemberships!: ChannelMember[];

  @OneToMany(() => Message, (message) => message.sender)
  messages!: Message[];
}
