import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { IdeaService } from "./idea.service";
import { IdeaControllerBase } from "./base/idea.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("ideas")
@common.Controller("ideas")
export class IdeaController extends IdeaControllerBase {
  constructor(
    protected readonly service: IdeaService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
