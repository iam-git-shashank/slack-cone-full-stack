import { IsBoolean, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Workspace } from "../../workspace/entities/workspace.entity";
import { User } from "../../users/entities/user.entity";
import { ChannelMember } from "../../chanmember/entity/chanMem.entity";
import { Message } from "../../messages/entity/message.entity";

@Entity("slack_channels")
export class Channels {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  isPrivate!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.channels)
  workspace!: Workspace;
  @ManyToOne(() => User, (user) => user.channelCreated)
  createdBy!: User;

  @OneToMany(() => ChannelMember, (member) => member.channel)
  members!: ChannelMember[];
  @OneToMany(() => Message, (message) => message.channel)
  messages!: Message[];
}