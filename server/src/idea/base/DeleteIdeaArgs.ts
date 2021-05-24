import { ArgsType, Field } from "@nestjs/graphql";
import { IdeaWhereUniqueInput } from "./IdeaWhereUniqueInput";

@ArgsType()
class DeleteIdeaArgs {
  @Field(() => IdeaWhereUniqueInput, { nullable: false })
  where!: IdeaWhereUniqueInput;
}

export { DeleteIdeaArgs };
