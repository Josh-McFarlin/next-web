import { getClient } from "../client";
import { PostType } from "../../../../types/post";

const postFields = `
  ...,
  "slug": slug.current,
  "categories": categories[]->title,
  "authorName": author->name,
  "authorImage": author->image,
`;

export const getPreviewPostBySlug = (slug: string): Promise<PostType> =>
  getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc) {
      ${postFields}
    }[0]`,
    { slug }
  );

export const getAllPostsSlugs = (preview = false): Promise<string[]> =>
  getClient(preview).fetch(`*[_type == "post"].slug.current`);

export const getAllPosts = async (preview = false): Promise<PostType[]> =>
  getClient(preview)
    .fetch(`*[_type == "post"] | order(date desc, publishedAt desc) {
      ${postFields}
    }`);

export const getPostAndMorePosts = async (
  slug: string,
  preview = false
): Promise<{ post: PostType; morePosts: PostType[] }> => {
  const curClient = getClient(preview);

  const post = await curClient.fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc) {
        ${postFields}
      }[0]`,
    { slug }
  );

  const morePosts = await curClient.fetch(
    `*[_type == "post" && slug.current != $slug] | order(date desc, publishedAt desc){
        ${postFields}
      }[0...2]`,
    { slug }
  );

  return {
    post,
    morePosts,
  };
};
