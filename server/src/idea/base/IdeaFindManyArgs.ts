import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IdeaWhereInput } from "./IdeaWhereInput";
import { Type } from "class-transformer";
import { IdeaOrderByInput } from "./IdeaOrderByInput";

@ArgsType()
class IdeaFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => IdeaWhereInput,
  })
  @Field(() => IdeaWhereInput, { nullable: true })
  @Type(() => IdeaWhereInput)
  where?: IdeaWhereInput;

  @ApiProperty({
    required: false,
    type: IdeaOrderByInput,
  })
  @Field(() => IdeaOrderByInput, { nullable: true })
  @Type(() => IdeaOrderByInput)
  orderBy?: IdeaOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { IdeaFindManyArgs };
