import * as React from "react";
import Link from "next/link";
import SimpleBlockContent from "../SimpleBlockContent";
import { imageBuilder } from "../../../utils/sanity/client";
import { PostType } from "../../../../types/post";
import urls from "../../../utils/urls";

interface PropTypes {
  post: PostType;
  morePosts?: PostType[];
}

const urlFor = (source: any) => imageBuilder.image(source);

const BlogPost = ({ post }: PropTypes) => {
  const {
    title = "Missing title",
    slug,
    categories,
    authorName = "Missing name",
    authorImage,
    body = [],
  } = post;

  return (
    <article>
      <Link
        prefetch
        href={urls.pages.blog.post()}
        as={urls.pages.blog.post(slug)}
      >
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <span>By {authorName}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={urlFor(authorImage).width(50).url() ?? undefined}
            alt="author"
          />
        </div>
      )}
      <SimpleBlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: "max" }}
      />
    </article>
  );
};

export default BlogPost;
