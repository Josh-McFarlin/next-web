export interface CTAType {
  _id: string;
  title: string;
  route?: {
    _ref: string;
    type: string;
  };
  link?: string;
}
