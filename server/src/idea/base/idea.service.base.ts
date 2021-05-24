import { PrismaService } from "nestjs-prisma";
import { Prisma, Idea } from "@prisma/client";

export class IdeaServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.IdeaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.IdeaFindManyArgs>
  ): Promise<number> {
    return this.prisma.idea.count(args);
  }

  async findMany<T extends Prisma.IdeaFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.IdeaFindManyArgs>
  ): Promise<Idea[]> {
    return this.prisma.idea.findMany(args);
  }
  async findOne<T extends Prisma.IdeaFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.IdeaFindUniqueArgs>
  ): Promise<Idea | null> {
    return this.prisma.idea.findUnique(args);
  }
  async create<T extends Prisma.IdeaCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.IdeaCreateArgs>
  ): Promise<Idea> {
    return this.prisma.idea.create<T>(args);
  }
  async update<T extends Prisma.IdeaUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.IdeaUpdateArgs>
  ): Promise<Idea> {
    return this.prisma.idea.update<T>(args);
  }
  async delete<T extends Prisma.IdeaDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.IdeaDeleteArgs>
  ): Promise<Idea> {
    return this.prisma.idea.delete(args);
  }
}
