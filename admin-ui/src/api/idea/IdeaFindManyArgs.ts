import { IdeaWhereInput } from "./IdeaWhereInput";
import { IdeaOrderByInput } from "./IdeaOrderByInput";

export type IdeaFindManyArgs = {
  where?: IdeaWhereInput;
  orderBy?: IdeaOrderByInput;
  skip?: number;
  take?: number;
};
