import { PortableTextType } from "./portableText";

export interface TextSectionType {
  _id?: string;
  _key?: string;
  heading?: string;
  label?: string;
  text: PortableTextType;
}
