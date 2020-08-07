import * as React from "react";
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
  siteConfig: SiteConfigType;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  page: PageType;
}

const SanityScreen = ({
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
        siteConfig={siteConfig}
        blogConfig={blogConfig}
        shopConfig={shopConfig}
      >
        {content && <RenderSections sections={content} />}
      </Layout>
    </>
  );
};

export async function getStaticProps({ params }: any) {
  const siteConfig = await getSiteConfig();
  const blogConfig = await getBlogConfig();
  const shopConfig = await getShopConfig();
  const page = await getPage(params?.slug?.join("/"));

  return {
    props: {
      siteConfig,
      blogConfig,
      shopConfig,
      page,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export async function getStaticPaths() {
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
}

export default SanityScreen;
