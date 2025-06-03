import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Channels } from "../../channels/entities/channel.entity";
import { WorkspaceMember } from "../../workMembers/entity/workMember.entity";
import { Invite } from "../../Invites/entity/invites.entity";

@Entity("slack_workpace")
export class Workspace {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({unique:true})
  name!: string;
  @ManyToOne(() => User, (user) => user.createdWorkspaces)
  createdBy!: User;
  @OneToMany(() => Channels, (channels) => channels.workspace)
  channels!: Channels[];
  @OneToMany(() => WorkspaceMember, (member) => member.workspace)
  members!: WorkspaceMember[];

  @OneToMany(() => Invite, (invite) => invite.workspace)
  invites!: Invite[];
}
