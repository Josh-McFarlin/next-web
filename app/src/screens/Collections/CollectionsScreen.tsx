import * as React from "react";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { Collection, Product } from "shopify-buy";
import Layout from "../../components/Layout";
import InlineCollection from "../../components/shop/InlineCollection";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getAllProducts } from "../../utils/shopify/actions/product";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { getAllCollections } from "../../utils/shopify/actions/collection";
import classes from "./CollectionsScreen.module.scss";

interface PropTypes {
  preview: boolean;
  siteConfig: SiteConfigType;
  shopConfig: ShopConfigType;
  blogConfig: BlogConfigType;
  collections: Collection[];
}

const CollectionsScreen = ({
  preview,
  siteConfig,
  shopConfig,
  blogConfig,
  collections = [],
}: PropTypes) => (
  <>
    <NextSeo
      title={shopConfig.title}
      titleTemplate={`${siteConfig.config.title} | %s`}
      description={shopConfig.description}
      // canonical={config.url && `${config.url}/${slug}`}
      openGraph={{
        images: shopConfig.openGraphImages,
      }}
    />
    <Layout
      preview={preview}
      siteConfig={siteConfig}
      shopConfig={shopConfig}
      blogConfig={blogConfig}
      inShop
    >
      <div className={classes.root}>
        {collections.map((collection: Collection) => (
          <InlineCollection key={collection.id} collection={collection} />
        ))}
      </div>
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const siteConfig = await getSiteConfig(preview);
  const shopConfig = await getShopConfig(preview);
  const blogConfig = await getBlogConfig(preview);
  const collections = await getAllCollections();

  let products: Product[] = [];
  if (shopConfig.enabled) {
    products = await getAllProducts();
  }

  return {
    props: {
      preview,
      siteConfig,
      shopConfig,
      blogConfig,
      products,
      collections,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
};

export default CollectionsScreen;
