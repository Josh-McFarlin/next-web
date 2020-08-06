import * as React from "react";
import Link from "next/link";
import SimpleBlockContent from "../SimpleBlockContent";
import { imageBuilder } from "../../../utils/sanity/client";
import { PostType } from "../../../../types/sanity/documents/post";
import urls from "../../../utils/urls";

interface PropTypes {
  post: PostType;
  morePosts?: PostType[];
}

const BlogPost = ({ post }: PropTypes) => {
  const { title, slug, publishedAt, categories, author, body = [] } = post;

  return (
    <article>
      <Link
        href={urls.pages.blog.post()}
        as={urls.pages.blog.post(slug, publishedAt)}
      >
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <span>By {author.name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {author.image != null && (
        <div>
          <img
            src={imageBuilder.image(author.image).width(50).url() ?? undefined}
            alt="author"
          />
        </div>
      )}
      <SimpleBlockContent
        blocks={body}
        imageOptions={{
          w: 320,
          h: 240,
          fit: "max",
        }}
      />
    </article>
  );
};

export default BlogPost;
