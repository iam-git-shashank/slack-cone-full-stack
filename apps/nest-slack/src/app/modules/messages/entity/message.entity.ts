import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Channels } from "../../channels/entities/channel.entity";
import { User } from "../../users/entities/user.entity";

@Entity("slack_message")
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Channels, (channel) => channel.messages)
  channel?: Channels;

  @ManyToOne(() => User, (user) => user.messages)
  sender!: User;

  @Column()
  content!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt!: Date;

  @ManyToOne(() => User, { nullable: true })
  recipient?: User;
  @Column({ default: false })
  isPinned!: boolean;
}
