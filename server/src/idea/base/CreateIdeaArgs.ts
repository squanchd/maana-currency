import { ArgsType, Field } from "@nestjs/graphql";
import { IdeaCreateInput } from "./IdeaCreateInput";

@ArgsType()
class CreateIdeaArgs {
  @Field(() => IdeaCreateInput, { nullable: false })
  data!: IdeaCreateInput;
}

export { CreateIdeaArgs };
