import { RouteType } from "./route";
import { LinkType } from "../objects/link";
import { PortableTextType } from "../objects/portableText";

export interface SiteConfigType {
  config: {
    title: string;
    mainNavigation: (RouteType | LinkType)[];
    footerNavigation: (RouteType | LinkType)[];
    footerText?: PortableTextType[];
    logo?: {
      asset: {
        url: string;
      };
    };
    url: string;
  };
  favicons: {
    appleIconUrl: string;
    thirtyIconUrl: string;
    sixIconUrl: string;
  };
}
