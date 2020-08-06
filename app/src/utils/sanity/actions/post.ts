import dayjs from "dayjs";
import { getClient } from "../client";
import { PostType } from "../../../../types/sanity/documents/post";

const formatDate = (date: string): string => dayjs(date).format("MM-DD-YYYY");
const reverseFormatDate = (date: string): string =>
  dayjs(date, "MM-DD-YYYY").toISOString();

const postFields = `
  ...,
  author->,
  "slug": slug.current,
  "categories": categories[]->title,
`;

export const getPreviewPostBySlug = (
  date: string,
  slug: string
): Promise<PostType> =>
  getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt == $publishedAt] | order(publishedAt desc) {
      ${postFields}
    }[0]`,
    {
      slug,
      publishedAt: reverseFormatDate(date),
    }
  );

export const getAllPostsSlugs = (preview = false): Promise<string[]> =>
  getClient(preview)
    .fetch(
      `*[_type == "post"] {
      publishedAt,
      "slug": slug.current
    }`
    )
    .then((res) =>
      res.map(
        ({ publishedAt, slug }: { publishedAt: string; slug: string }) =>
          `${formatDate(publishedAt)}/${slug}`
      )
    );

export const getAllPosts = async (preview = false): Promise<PostType[]> =>
  getClient(preview).fetch(`*[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }`);

export const getPostAndMorePosts = async (
  date: string,
  slug: string,
  preview = false
): Promise<{ post: PostType; morePosts: PostType[] }> => {
  const curClient = getClient(preview);

  const post = await curClient.fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt == $publishedAt] | order(publishedAt desc) {
        ${postFields}
      }[0]`,
    {
      slug,
      publishedAt: reverseFormatDate(date),
    }
  );

  const morePosts = await curClient.fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) {
        ${postFields}
      }[0...2]`,
    { slug }
  );

  return {
    post,
    morePosts,
  };
};
