import * as React from "react";
import { NextSeo } from "next-seo";
import Layout from "../../components/Layout";
import BlogPost from "../../components/cms/BlogPost";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import { getAllPosts } from "../../utils/sanity/actions/post";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { PostType } from "../../../types/sanity/documents/post";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";

interface PropTypes {
  siteConfig: SiteConfigType;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  blogPosts: PostType[];
}

const BlogScreen = ({
  siteConfig,
  blogConfig,
  shopConfig,
  blogPosts = [],
}: PropTypes) => (
  <>
    <NextSeo
      title={blogConfig.title}
      titleTemplate={`${siteConfig.config.title} | %s`}
      description={blogConfig.description}
      // canonical={config.url && `${config.url}/${slug}`}
      openGraph={{
        images: blogConfig.openGraphImages,
      }}
    />
    <Layout
      siteConfig={siteConfig}
      blogConfig={blogConfig}
      shopConfig={shopConfig}
    >
      <div>
        {blogPosts.map((post) => (
          <BlogPost key={post._id} post={post} />
        ))}
      </div>
    </Layout>
  </>
);

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  const blogConfig = await getBlogConfig();
  const shopConfig = await getShopConfig();

  let blogPosts: PostType[] = [];
  if (blogConfig.enabled) {
    blogPosts = await getAllPosts();
  }

  return {
    props: {
      siteConfig,
      blogConfig,
      shopConfig,
      blogPosts,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export default BlogScreen;
