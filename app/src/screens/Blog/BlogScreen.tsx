import * as React from "react";
import BlogPost from "../../components/cms/BlogPost";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getAllPosts } from "../../utils/sanity/actions/post";
import { SiteConfigType } from "../../../../types/siteConfig";
import { PostType } from "../../../../types/post";
import Layout from "../../components/Layout";

interface PropTypes {
  siteConfig: SiteConfigType;
  blogPosts: PostType[];
}

const BlogScreen = ({ siteConfig, blogPosts = [] }: PropTypes) => (
  <Layout siteConfig={siteConfig}>
    <div>
      {blogPosts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  </Layout>
);

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  const blogPosts = await getAllPosts();

  return {
    props: {
      siteConfig,
      blogPosts,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export default BlogScreen;
