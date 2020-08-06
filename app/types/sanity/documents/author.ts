import { FigureType } from "../objects/figure";
import { PortableTextType } from "../objects/portableText";

export interface AuthorType {
  _id: string;
  name: string;
  slug: string;
  image?: FigureType;
  bio?: PortableTextType;
  _createdAt: string;
  _updatedAt: string;
  _type: string;
}
