import { SchoolType } from "./school";

export interface EducationType {
  _id: string;
  heading: string;
  schools: SchoolType[];
}
