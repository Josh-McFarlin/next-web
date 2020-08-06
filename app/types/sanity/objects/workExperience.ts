import { JobType } from "./job";

export interface WorkExperienceType {
  _id?: string;
  _key?: string;
  heading?: string;
  jobs: JobType[];
}
