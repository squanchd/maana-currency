import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateIdeaArgs } from "./CreateIdeaArgs";
import { UpdateIdeaArgs } from "./UpdateIdeaArgs";
import { DeleteIdeaArgs } from "./DeleteIdeaArgs";
import { IdeaFindManyArgs } from "./IdeaFindManyArgs";
import { IdeaFindUniqueArgs } from "./IdeaFindUniqueArgs";
import { Idea } from "./Idea";
import { IdeaService } from "../idea.service";

@graphql.Resolver(() => Idea)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class IdeaResolverBase {
  constructor(
    protected readonly service: IdeaService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Idea",
    action: "read",
    possession: "any",
  })
  async _ideasMeta(
    @graphql.Args() args: IdeaFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Idea])
  @nestAccessControl.UseRoles({
    resource: "Idea",
    action: "read",
    possession: "any",
  })
  async ideas(
    @graphql.Args() args: IdeaFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Idea[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Idea",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Idea, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Idea",
    action: "read",
    possession: "own",
  })
  async idea(
    @graphql.Args() args: IdeaFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Idea | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Idea",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Idea)
  @nestAccessControl.UseRoles({
    resource: "Idea",
    action: "create",
    possession: "any",
  })
  async createIdea(
    @graphql.Args() args: CreateIdeaArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Idea> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Idea",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Idea"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Idea)
  @nestAccessControl.UseRoles({
    resource: "Idea",
    action: "update",
    possession: "any",
  })
  async updateIdea(
    @graphql.Args() args: UpdateIdeaArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Idea | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Idea",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Idea"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Idea)
  @nestAccessControl.UseRoles({
    resource: "Idea",
    action: "delete",
    possession: "any",
  })
  async deleteIdea(@graphql.Args() args: DeleteIdeaArgs): Promise<Idea | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
