export interface BlogConfigType {
  _id: string;
  title: string;
  enabled: boolean;
  display: boolean;
  description?: string;
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
