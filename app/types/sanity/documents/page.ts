export interface PageType {
  _id: string;
  title: string;
  content: any;
  description?: string;
  disallowRobots?: boolean;
  config: any;
  slug: {
    current: string;
  };
  socialLinks?: string[];
  openGraphImages?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  }[];
  _createdAt: string;
  _updatedAt: string;
  _type: string;
}
