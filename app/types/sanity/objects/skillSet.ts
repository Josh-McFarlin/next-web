import { SkillType } from "./skill";

export interface SkillSetType {
  _id?: string;
  _key?: string;
  heading: string;
  skills: SkillType[];
}
