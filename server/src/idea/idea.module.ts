import { Module } from "@nestjs/common";
import { IdeaModuleBase } from "./base/idea.module.base";
import { IdeaService } from "./idea.service";
import { IdeaController } from "./idea.controller";
import { IdeaResolver } from "./idea.resolver";

@Module({
  imports: [IdeaModuleBase],
  controllers: [IdeaController],
  providers: [IdeaService, IdeaResolver],
  exports: [IdeaService],
})
export class IdeaModule {}
