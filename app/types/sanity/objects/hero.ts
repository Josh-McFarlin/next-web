import { PortableTextType } from "./portableText";
import { FigureType } from "./figure";
import { CTAType } from "./cta";

export interface HeroType {
  _id: string;
  heading: string;
  tagline?: PortableTextType;
  backgroundImage: FigureType;
  ctas?: CTAType[];
}
