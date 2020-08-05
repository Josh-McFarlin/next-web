import { getClient, imageBuilder } from "../client";

const frontPageQuery = `
  *[_id == "global-config"] {
    frontpage -> {
      ...,
      content[] {
        ...,
        cta {
          ...,
          route->
        },
        ctas[] {
          ...,
          route->
        }
      }
    }
  }[0]
`;

const pageQuery = `
  *[_type == "route" && slug.current == $slug] {
    page-> {
      ...,
      content[] {
        ...,
        cta {
          ...,
          route->
        },
        ctas[] {
          ...,
          route->
        }
      }
    }
  }[0]
`;

export const getPage = async (slug = "/") => {
  const pageData =
    slug === "/"
      ? await getClient(false)
          .fetch(frontPageQuery)
          .then((res: any) => res.frontpage)
      : await getClient(false)
          .fetch(pageQuery, { slug })
          .then((res: any) => res.page);

  const openGraphImages = pageData.openGraphImage
    ? [
        {
          url: imageBuilder
            .image(pageData.openGraphImage)
            .width(800)
            .height(600)
            .url(),
          width: 800,
          height: 600,
          alt: pageData.title ?? "Missing Title",
        },
        {
          // Facebook recommended size
          url: imageBuilder
            .image(pageData.openGraphImage)
            .width(1200)
            .height(630)
            .url(),
          width: 1200,
          height: 630,
          alt: pageData.title ?? "Missing Title",
        },
        {
          // Square 1:1
          url: imageBuilder
            .image(pageData.openGraphImage)
            .width(600)
            .height(600)
            .url(),
          width: 600,
          height: 600,
          alt: pageData.title ?? "Missing Title",
        },
      ]
    : [];

  return {
    slug,
    ...pageData,
    openGraphImages,
  };
};
