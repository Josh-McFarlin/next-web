import * as React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import BlockContent from "../BlockContent";
import { imageBuilder } from "../../../utils/sanity/client";
import { PostType } from "../../../../types/sanity/documents/post";
import urls from "../../../utils/urls";
import classes from "./BlogPost.module.scss";

interface PropTypes {
  post: PostType;
  inline?: boolean;
  morePosts?: PostType[];
}

const formatDate = (date: string): string => dayjs(date).format("MM-DD-YYYY");

const OptionalImage = ({ image }: { image: PostType["author"]["image"] }) => {
  const authorImage =
    image != null
      ? imageBuilder
          .image(image)
          .width(100)
          .height(100)
          .dpr(3)
          .auto("format")
          .url() ?? undefined
      : undefined;

  if (authorImage == null) return <div className={classes.authorImage} />;

  return <img className={classes.authorImage} src={authorImage} alt="author" />;
};

const BlogPost = ({ post, inline = true, morePosts = [] }: PropTypes) => {
  const { title, slug, publishedAt, categories = [], author, body = [] } = post;

  return (
    <div className={classes.root}>
      {!inline && (
        <div className={classes.infoSection}>
          <div className={classes.author}>
            <OptionalImage image={author.image} />
            <div className={classes.authorBio}>
              <h4>{author.name}</h4>
              {author.bio != null && (
                <BlockContent
                  className={classes.description}
                  blocks={author.bio as any}
                />
              )}
            </div>
          </div>
          <div className={classes.similarPosts}>
            {morePosts.map((post) => (
              <div key={post._id} className={classes.post}>
                <h2>{post.title}</h2>
                <p>{formatDate(post.publishedAt)}</p>
                <div className={classes.author}>
                  <OptionalImage image={post.author.image} />
                  <p>{post.author.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <article className={classes.article}>
        <Link href={urls.pages.blog.post()} as={urls.pages.blog.post(slug)}>
          <a>
            <h1>{title}</h1>
            <p>{formatDate(publishedAt)}</p>
          </a>
        </Link>
        {categories.length > 0 && <h6>Posted in {categories.join(", ")}</h6>}
        <BlockContent
          className={classes.content}
          blocks={body}
          imageOptions={{
            w: 320,
            h: 240,
            fit: "max",
          }}
        />
      </article>
    </div>
  );
};

export default BlogPost;
