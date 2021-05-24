import { Idea as TIdea } from "../api/idea/Idea";

export const IDEA_TITLE_FIELD = "name";

export const IdeaTitle = (record: TIdea) => {
  return record.name;
};
