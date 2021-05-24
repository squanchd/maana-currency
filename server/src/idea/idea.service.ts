import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { IdeaServiceBase } from "./base/idea.service.base";

@Injectable()
export class IdeaService extends IdeaServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
