import { IconType } from "../objects/icon";

export interface RouteType {
  _id: string;
  _key: string;
  title: string; // Page title
  icon?: IconType;
  slug: {
    current: string;
  };
  page: {
    _ref: string;
    _type: string;
  };
  includeInSitemap: boolean;
  disallowRobots: boolean;
  _createdAt: string;
  _updatedAt: string;
  _type: string;
}
