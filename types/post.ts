export interface PostType {
  _id: string;
  title: string;
  publishedAt: string;
  slug: string;
  categories?: string[];
  authorName: string;
  authorImage?: any;
  body: any[];
}
