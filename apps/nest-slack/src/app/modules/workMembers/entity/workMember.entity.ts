import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Workspace } from "../../workspace/entities/workspace.entity";

@Entity("workspace_member")
export class WorkspaceMember {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.workspaceMemberships)
  user!: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.members)
  workspace!: Workspace;

  @Column({
    type: "enum",
    enum: ["owner", "admin", "member"],
    default: "member",
  })
  role!: "owner" | "admin" | "member";

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  joinedAt!: Date;
}
