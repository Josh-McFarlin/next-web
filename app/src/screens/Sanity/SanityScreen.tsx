import * as React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import RenderSections from "../../components/cms/RenderSections";
import Layout from "../../components/Layout";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getPage } from "../../utils/sanity/actions/page";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { PageType } from "../../../types/sanity/documents/page";
import { getAllRoutes } from "../../utils/sanity/actions/route";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";

interface PropTypes {
  preview: boolean;
  siteConfig: SiteConfigType;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  page: PageType;
}

const SanityScreen = ({
  preview,
  siteConfig,
  blogConfig,
  shopConfig,
  page,
}: PropTypes) => {
  const {
    title = "Missing title",
    description,
    disallowRobots = false,
    content = [],
    config = {},
    socialLinks = [],
    slug,
    openGraphImages = [],
  } = page;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`${siteConfig.config.title} | %s`}
        description={description}
        canonical={config.url && `${config.url}/${slug}`}
        openGraph={{
          images: openGraphImages,
        }}
        noindex={disallowRobots}
      />
      <SocialProfileJsonLd
        type="Person"
        name={config.name}
        url={config.url}
        sameAs={socialLinks}
      />
      <Layout
        preview={preview}
        siteConfig={siteConfig}
        blogConfig={blogConfig}
        shopConfig={shopConfig}
      >
        {content && <RenderSections sections={content} />}
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
  const page = await getPage(params?.slug, preview);

  return {
    props: {
      preview,
      siteConfig,
      blogConfig,
      shopConfig,
      page,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allRoutes = await getAllRoutes();

  const paths =
    allRoutes?.map((routeSlug: string) => ({
      params: {
        slug: routeSlug.split("/"),
      },
    })) || [];

  return {
    paths,
    fallback: false,
  };
};

export default SanityScreen;
