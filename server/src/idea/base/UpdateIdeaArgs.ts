import { ArgsType, Field } from "@nestjs/graphql";
import { IdeaWhereUniqueInput } from "./IdeaWhereUniqueInput";
import { IdeaUpdateInput } from "./IdeaUpdateInput";

@ArgsType()
class UpdateIdeaArgs {
  @Field(() => IdeaWhereUniqueInput, { nullable: false })
  where!: IdeaWhereUniqueInput;
  @Field(() => IdeaUpdateInput, { nullable: false })
  data!: IdeaUpdateInput;
}

export { UpdateIdeaArgs };
