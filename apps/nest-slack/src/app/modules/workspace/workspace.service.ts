import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Workspace } from "./entities/workspace.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { WorkspaceMember } from "../workMembers/entity/workMember.entity";

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workRepo: Repository<Workspace>,

    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>
  ) {}
  async create(createWorkspaceDto: CreateWorkspaceDto, user: User) {
    const row = await this.workRepo.create({
      ...createWorkspaceDto,
      createdBy: user,
    });
    const savedWorkspace = await this.workRepo.save(row);
    await this.workspaceMemberRepository.save({
      user,
      workspace: savedWorkspace,
      role: "owner",
    });

    return "This action adds a new workspace";
  }

  async findAllForUser(userId: number): Promise<Workspace[]> {
    return this.workRepo
      .createQueryBuilder("workspace")
      .innerJoin("workspace.members", "member")
      .where("member.userId = :userId", { userId })
      .getMany();
  }

  async findOne(id: number, userId: number) {
    const workspace = await this.workRepo
      .createQueryBuilder("workspace")
      .innerJoin("workspace.members", "member")
      .where("workspace.id = :id", { id })
      .andWhere("member.userId = :userId", { userId })
      .getOne();

    if (!workspace) {
      throw new NotFoundException(
        `Workspace with ID ${id} not found or access denied`
      );
    }

    return workspace;
  }

  async update(
    id: number,
    updateWorkspaceDto: UpdateWorkspaceDto,
    userId: number
  ): Promise<Workspace> {
    const workspace = await this.findOne(id, userId);
    Object.assign(workspace, updateWorkspaceDto);
    return this.workRepo.save(workspace);
  }


  async remove(id: number, userId: number): Promise<void> {
    const workspace = await this.findOne(id, userId);
    await this.workRepo.remove(workspace);
  }

  async userHasRole(
    workspaceId: number,
    userId: number,
    requiredRole: string
  ): Promise<boolean> {
    const member = await this.workspaceMemberRepository.findOne({
      where: {
        workspace: { id: workspaceId },
        user: { id: userId },
      },
    });

    if (!member) return false;

    const rolesHierarchy = ["owner", "admin", "member"];
    return (
      rolesHierarchy.indexOf(member.role) <=
      rolesHierarchy.indexOf(requiredRole)
    );
  }
}
