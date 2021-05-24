import { ArgsType, Field } from "@nestjs/graphql";
import { IdeaWhereUniqueInput } from "./IdeaWhereUniqueInput";

@ArgsType()
class IdeaFindUniqueArgs {
  @Field(() => IdeaWhereUniqueInput, { nullable: false })
  where!: IdeaWhereUniqueInput;
}

export { IdeaFindUniqueArgs };
