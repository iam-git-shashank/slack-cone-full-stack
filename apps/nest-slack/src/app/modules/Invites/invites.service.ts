import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workspace } from "../workspace/entities/workspace.entity";
import { User } from "../users/entities/user.entity";
import * as crypto from "crypto";
import { Invite } from "./entity/invites.entity";

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createInvite(workspaceId: number, email: string, createdBy: User) {
    const workspace = await this.workspaceRepository.findOneBy({
      id: workspaceId,
    });
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    // Check if user already exists in workspace
    const existingUser = await this.userRepository.findOne({
      where: { email },
      relations: ["workspaces"],
    });

    if (existingUser?.workspaceMemberships?.some((w) => w.id === workspaceId)) {
      throw new Error("User is already a member of this workspace");
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    const invite = this.inviteRepository.create({
      workspace,
      email,
      token,
      createdBy,
      expiresAt,
      status: "pending",
    });

    await this.inviteRepository.save(invite);

    // Send invitation email
  

    return invite;
  }

  // async acceptInvite(token: string, user: User) {
  //   const invite = await this.inviteRepository.findOne({
  //     where: { token },
  //     relations: ["workspace", "createdBy"],
  //   });

  //   if (!invite) {
  //     throw new Error("Invalid invitation token");
  //   }

  //   if (invite.status !== "pending") {
  //     throw new Error("Invitation has already been processed");
  //   }

  //   if (new Date() > invite.expiresAt) {
  //     invite.status = "expired";
  //     await this.inviteRepository.save(invite);
  //     throw new Error("Invitation has expired");
  //   }

  //   if (invite.email !== user.email) {
  //     throw new Error("This invitation is not for your email address");
  //   }

  //   // Add user to workspace
  //   const workspace = await this.workspaceRepository.findOne({
  //     where: { id: invite.workspace.id },
  //     relations: ["members"],
  //   });
  //   if(!workspace){
  //       throw new Error("Invite not found");
  //   }
  //   if (!workspace.members.some((member) => member.id === user.id)) {
  //     workspace.members.push(user)
  //     await this.workspaceRepository.save(workspace);
  //   }

  //   // Update invite status
  //   invite.status = "accepted";
  //   await this.inviteRepository.save(invite);

  //   return workspace;
  // }

  async revokeInvite(inviteId: number, userId: number) {
    const invite = await this.inviteRepository.findOne({
      where: { id: inviteId },
      relations: ["createdBy"],
    });

    if (!invite) {
      throw new Error("Invite not found");
    }

    if (invite.createdBy.id !== userId) {
      throw new Error("Only the inviter can revoke this invitation");
    }

    if (invite.status !== "pending") {
      throw new Error("Only pending invites can be revoked");
    }

    invite.status = "revoked";
    await this.inviteRepository.save(invite);

    return invite;
  }
}
