import { PortableTextType } from "./portableText";

export interface JobType {
  _id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: PortableTextType;
}
