import { getClient } from "../client";
import { PostType } from "../../../../types/sanity/documents/post";
import { convertSlug } from "../utils";

const postFields = `
  ...,
  author->,
  "slug": slug.current,
  "categories": categories[]->title,
`;

export const getAllPostsSlugs = (preview = false): Promise<string[]> =>
  getClient(preview).fetch(`*[_type == "post"].slug.current`);

export const getAllPosts = async (preview = false): Promise<PostType[]> =>
  getClient(preview)
    .fetch(
      `*[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }`
    )
    .then((posts: PostType[]) => {
      const uniqueSlugs = new Set<string>();

      return posts.filter((post) => {
        if (uniqueSlugs.has(post.slug)) return false;

        uniqueSlugs.add(post.slug);
        return true;
      });
    });

export const getPostAndMorePosts = async (
  slug: string | string[] | undefined,
  preview = false
): Promise<{ post: PostType; morePosts: PostType[] } | null> => {
  const fixedSlug = convertSlug(slug);
  const curClient = getClient(preview);

  if (fixedSlug == null) return null;

  const post = await curClient.fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc, _updatedAt desc) {
        ${postFields}
      }[0]`,
    {
      slug: fixedSlug,
    }
  );

  const morePosts = await curClient.fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc) {
        ${postFields}
      }[0...2]`,
    { slug: fixedSlug }
  );

  return {
    post,
    morePosts,
  };
};
