import { ProjectType } from "./project";

export interface ProjectsSectionType {
  _id?: string;
  _key?: string;
  heading?: string;
  projects: ProjectType[];
}
