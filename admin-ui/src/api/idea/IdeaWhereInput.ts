import { StringFilter } from "../../util/StringFilter";

export type IdeaWhereInput = {
  description?: StringFilter;
  id?: StringFilter;
  name?: StringFilter;
};
