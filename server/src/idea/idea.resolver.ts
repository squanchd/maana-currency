import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { IdeaResolverBase } from "./base/idea.resolver.base";
import { Idea } from "./base/Idea";
import { IdeaService } from "./idea.service";

@graphql.Resolver(() => Idea)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class IdeaResolver extends IdeaResolverBase {
  constructor(
    protected readonly service: IdeaService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
