import * as React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import BlogPost from "../../components/cms/BlogPost";
import Layout from "../../components/Layout";
import {
  getAllPostsSlugs,
  getPostAndMorePosts,
} from "../../utils/sanity/actions/post";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { PostType } from "../../../../types/post";
import { SiteConfigType } from "../../../../types/siteConfig";

interface PropTypes {
  siteConfig: SiteConfigType;
  preview: boolean;
  post: PostType;
  morePosts: PostType[];
}

const BlogPostScreen = ({
  siteConfig,
  preview,
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
    <Layout siteConfig={siteConfig}>
      <BlogPost post={post} morePosts={morePosts} />
    </Layout>
  );
};

export async function getStaticProps({ params, preview = false }: any) {
  const siteConfig = await getSiteConfig();
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsSlugs();

  const paths =
    allPosts?.map((postSlug: string) => ({
      params: {
        slug: postSlug,
      },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export default BlogPostScreen;
