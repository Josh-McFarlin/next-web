import * as React from "react";
import { Product, Shop } from "shopify-buy";
import InlineProduct from "../../components/shop/InlineProduct";
import Layout from "../../components/Layout";
import { SiteConfigType } from "../../../../types/siteConfig";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getAllProducts } from "../../utils/shopify/actions/product";
import classes from "./ProductsScreen.module.scss";
import { getShopInfo } from "../../utils/shopify/actions/shop";

interface PropTypes {
  siteConfig: SiteConfigType;
  shopInfo: Shop;
  products: Product[];
}

const ProductsScreen = ({ siteConfig, products = [] }: PropTypes) => (
  <Layout siteConfig={siteConfig}>
    <div className={classes.root}>
      {products.map((product: Product) => (
        <InlineProduct key={product.id} product={product} />
      ))}
    </div>
  </Layout>
);

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  const shopInfo = await getShopInfo();
  const products = await getAllProducts();

  return {
    props: {
      siteConfig,
      shopInfo,
      products,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export default ProductsScreen;
