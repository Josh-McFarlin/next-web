import { PortableTextType } from "./portableText";
import { FigureType } from "./figure";
import { TitledLinkType } from "./titledLink";

export interface ProjectType {
  _id?: string;
  _key?: string;
  name: string;
  tags: string[];
  portableText?: PortableTextType;
  image?: FigureType;
  links: TitledLinkType[];
}
