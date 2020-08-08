import { getClient, imageBuilder } from "../client";
import { convertSlug } from "../utils";

const pageData = `
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
    },
    text[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": *[_id == ^._ref][0].slug,
        }
      }
    }
  }
`;

const frontPageQuery = `
  *[_id == "global-config"] | order(_updatedAt desc) {
    ...select(
      $preview == true =>
        *[_id == "drafts." + ^.frontpage._ref || _id == ^.frontpage._ref] | order(_updatedAt desc) {
          ${pageData},
        }[0],
      *[_id == ^.frontpage._ref] {
        ${pageData},
      }[0],
    )
  }[0]
`;

const pageQuery = `
  *[_type == "route" && slug.current == $slug] {
    ...select(
      $preview == true =>
        *[_id == "drafts." + ^.page._ref || _id == ^.page._ref] | order(_updatedAt desc) {
          ${pageData},
        }[0],
      *[_id == ^.page._ref] {
        ${pageData},
      }[0],
    )
  }[0]
`;

export const getPage = async (
  slug: string | string[] | undefined = "/",
  preview = false
) => {
  const fixedSlug = convertSlug(slug);
  const client = getClient(preview);

  const pageData =
    slug === "/"
      ? await client.fetch(frontPageQuery, {
          preview,
        })
      : await client.fetch(pageQuery, {
          slug: fixedSlug,
          preview,
        });

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
    slug: fixedSlug,
    ...pageData,
    openGraphImages,
  };
};
