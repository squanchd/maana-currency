import { IdeaWhereUniqueInput } from "./IdeaWhereUniqueInput";
import { IdeaUpdateInput } from "./IdeaUpdateInput";

export type UpdateIdeaArgs = {
  where: IdeaWhereUniqueInput;
  data: IdeaUpdateInput;
};
