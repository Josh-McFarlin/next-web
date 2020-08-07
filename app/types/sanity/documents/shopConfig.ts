export interface ShopConfigType {
  _id: string;
  title: string;
  enabled: boolean;
  display: boolean;
  cart: boolean;
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

export interface ShopConfigLayoutType {
  title: string;
  enabled: boolean;
  display: boolean;
  cart: boolean;
}
