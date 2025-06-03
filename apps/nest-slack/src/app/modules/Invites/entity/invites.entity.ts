import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Workspace } from "../../workspace/entities/workspace.entity";

@Entity('invites')
export class Invite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.invites)
  workspace!: Workspace;

  @Column()
  email!: string;

  @Column({ unique: true })
  token!: string;

  @ManyToOne(() => User, (user) => user.sentInvites)
  createdBy!: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp" })
  expiresAt!: Date;

  @Column({
    type: "enum",
    enum: ["pending", "accepted", "expired", "revoked"],
    default: "pending",
  })
  status!: "pending" | "accepted" | "expired" | "revoked";
}
