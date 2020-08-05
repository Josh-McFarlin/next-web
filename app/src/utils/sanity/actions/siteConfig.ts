import { getClient, imageBuilder } from "../client";
import { SiteConfigType } from "../../../../types/siteConfig";

export const getSiteConfig = async (
  preview = false
): Promise<SiteConfigType> => {
  const config = await getClient(preview).fetch(`
    *[_id == "global-config"] {
      ...,
      mainNavigation[] -> {
        ...,
        "title": page->title
      },
      footerNavigation[] -> {
        ...,
        "title": page->title
      }
    }[0]
  `);

  const favicons = {
    appleIconUrl: imageBuilder
      .image(config?.favicon)
      .width(180)
      .height(180)
      .format("png")
      .url(),
    thirtyIconUrl: imageBuilder
      .image(config?.favicon)
      .width(32)
      .height(32)
      .fit("clip")
      .format("png")
      .url(),
    sixIconUrl: imageBuilder
      .image(config?.favicon)
      .width(16)
      .height(16)
      .fit("clip")
      .format("png")
      .url(),
  } as any;

  return {
    config,
    favicons,
  };
};
