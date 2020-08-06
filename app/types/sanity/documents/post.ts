import { AuthorType } from "./author";
import { PortableTextType } from "../objects/portableText";

export interface PostType {
  _id: string;
  title: string;
  publishedAt: string;
  slug: string;
  categories: string[];
  author: AuthorType;
  body: PortableTextType[];
  _createdAt: string;
  _updatedAt: string;
  _type: string;
}
