import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { User } from "../users/entities/user.entity";

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(
    @Body("dto") createWorkspaceDto: CreateWorkspaceDto,
    @Body("user") user: User
  ) {
    return this.workspaceService.create(createWorkspaceDto, user);
  }
  @Get()
  findAllForUser(@Req() req: any) {
    return this.workspaceService.findAllForUser(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: any) {
    return this.workspaceService.findOne(+id, req.user.id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
    @Req() req: any
  ) {
    return this.workspaceService.update(+id, updateWorkspaceDto, req.user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: any) {
    return this.workspaceService.remove(+id, req.user.id);
  }
}
