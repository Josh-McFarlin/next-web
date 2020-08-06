import { PortableTextType } from "./portableText";
import { FigureType } from "./figure";
import { CTAType } from "./cta";

export interface ImageSectionType {
  _id: string;
  heading?: string;
  label?: string;
  text?: PortableTextType;
  image: FigureType;
  cta?: CTAType;
}
