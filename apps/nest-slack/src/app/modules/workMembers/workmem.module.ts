import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkMemService } from "./workMem.service";
import { WorkMemeController } from "./workMem.controller";

@Module({
  imports: [TypeOrmModule.forFeature([])],
  exports: [],
  controllers: [WorkMemeController],
  providers: [WorkMemService],
})
export class WorkMemModule {}