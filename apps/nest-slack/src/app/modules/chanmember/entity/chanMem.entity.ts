import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Channels } from "../../channels/entities/channel.entity";

@Entity('channel_member')
export class ChannelMember {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.channelMemberships)
  user!: User;

  @ManyToOne(() => Channels, (channel) => channel.members)
  channel!: Channels;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  joinedAt!: Date;
}
