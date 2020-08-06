import { FigureType } from "./figure";
import { EmbedHTMLType } from "./embedHTML";

export type MarkType = "strong" | "em" | "code" | string;

export interface ChildType {
  _key: string;
  _type: "span";
  marks: MarkType[];
  text: string;
}

export interface MarkDef {
  _key: string;
  _type: "internalLink" | "link";
  _ref?: string;
  href?: string;
}

export interface TextType {
  _key: string;
  _type: string;
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  level?: number;
  listItem?: "bullet" | "number";
  markDefs: MarkDef[];
  children: ChildType[];
}

export type PortableTextType = (TextType | FigureType | EmbedHTMLType)[];
