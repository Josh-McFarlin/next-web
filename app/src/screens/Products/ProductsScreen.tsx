import * as React from "react";
import { NextSeo } from "next-seo";
import { Product, Shop } from "shopify-buy";
import Layout from "../../components/Layout";
import InlineProduct from "../../components/shop/InlineProduct";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getAllProducts } from "../../utils/shopify/actions/product";
import { getShopInfo } from "../../utils/shopify/actions/shop";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import classes from "./ProductsScreen.module.scss";
import { GetStaticProps } from "next";

interface PropTypes {
  preview: boolean;
  siteConfig: SiteConfigType;
  shopConfig: ShopConfigType;
  blogConfig: BlogConfigType;
  shopInfo: Shop;
  products: Product[];
}

const ProductsScreen = ({
  preview,
  siteConfig,
  shopConfig,
  blogConfig,
  products = [],
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
    >
      <div className={classes.root}>
        {products.map((product: Product) => (
          <InlineProduct key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const siteConfig = await getSiteConfig(preview);
  const shopConfig = await getShopConfig(preview);
  const blogConfig = await getBlogConfig(preview);
  const shopInfo = await getShopInfo();

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
      shopInfo,
      products,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
};

export default ProductsScreen;
