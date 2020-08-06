import { FigureType } from "./figure";

export interface BasicImageType {
  _id: string;
  image: FigureType;
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?: number;
  circular: boolean;
}
