import * as React from "react";
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import RenderSections from "../../components/cms/RenderSections";
import Layout from "../../components/Layout";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getPage } from "../../utils/sanity/actions/page";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { PageType } from "../../../types/sanity/documents/page";
import { getAllRoutes } from "../../utils/sanity/actions/route";

interface PropTypes {
  siteConfig: SiteConfigType;
  page: PageType;
}

const SanityScreen = ({ siteConfig, page }: PropTypes) => {
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
      <Layout siteConfig={siteConfig}>
        {content && <RenderSections sections={content} />}
      </Layout>
    </>
  );
};

export async function getStaticProps({ params }: any) {
  const siteConfig = await getSiteConfig();
  const page = await getPage(params?.slug.join("/"));

  return {
    props: {
      siteConfig,
      page,
    },
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
