export interface PageType {
  title: string;
  description?: string;
  disallowRobots?: boolean;
  content?: any;
  config: any;
  slug: any;
  socialLinks?: string[];
  openGraphImages?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  }[];
}
