export interface SiteConfigType {
  config: {
    name: string;
    mainNavigation: {
      _id: string;
      title: string;
      link: string;
      slug: {
        current: string;
      };
    }[];
    footerNavigation: {
      _id: string;
      title: string;
      link: string;
      slug: {
        current: string;
      };
    }[];
    footerText: any[];
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
