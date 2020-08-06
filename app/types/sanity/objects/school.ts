import { PortableTextType } from "./portableText";

export interface SchoolType {
  name: string;
  location?: string;
  startYear: string;
  endYear: string;
  description?: PortableTextType;
}
