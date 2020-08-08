import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { NextSeo } from "next-seo";
import BlogPost from "../../components/cms/BlogPost";
import Layout from "../../components/Layout";
import {
  getAllPostsSlugs,
  getPostAndMorePosts,
} from "../../utils/sanity/actions/post";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { PostType } from "../../../types/sanity/documents/post";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";

interface PropTypes {
  preview: boolean;
  siteConfig: SiteConfigType;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  post: PostType;
  morePosts: PostType[];
}

const BlogPostScreen = ({
  preview,
  siteConfig,
  blogConfig,
  shopConfig,
  post,
  morePosts,
}: PropTypes) => {
  const router = useRouter();

  if (!router.isFallback && post?.slug == null) {
    return <ErrorPage statusCode={404} />;
  } else if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <NextSeo
        title={post.title}
        titleTemplate={`${siteConfig.config.title} | %s`}
        description={blogConfig.description}
        // canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: blogConfig.openGraphImages,
        }}
      />
      <Layout
        preview={preview}
        siteConfig={siteConfig}
        blogConfig={blogConfig}
        shopConfig={shopConfig}
      >
        <BlogPost post={post} morePosts={morePosts} inline={false} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const siteConfig = await getSiteConfig(preview);
  const blogConfig = await getBlogConfig(preview);
  const shopConfig = await getShopConfig(preview);
  const data = await getPostAndMorePosts(params?.slug, preview);

  return {
    props: {
      preview,
      siteConfig,
      blogConfig,
      shopConfig,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogConfig = await getBlogConfig();

  let paths: any[] = [];
  if (blogConfig.enabled) {
    const allPosts = await getAllPostsSlugs();

    paths =
      allPosts?.map((postSlug: string) => ({
        params: {
          slug: postSlug.split("/"),
        },
      })) || [];
  }

  return {
    paths,
    fallback: blogConfig.enabled,
  };
};

export default BlogPostScreen;
