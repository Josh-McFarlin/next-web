import * as React from "react";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import { Shop } from "shopify-buy";
import Layout from "../../components/Layout";
import CartItem from "./CartItem";
import { selectItems, selectInfo } from "../../utils/store/cart/selectors";
import { CartItemType } from "../../utils/store/cart/types";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getShopInfo } from "../../utils/shopify/actions/shop";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import { getShopConfig } from "../../utils/sanity/actions/shopConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { getBlogConfig } from "../../utils/sanity/actions/blogConfig";
import classes from "./CartScreen.module.scss";

interface PropTypes {
  siteConfig: SiteConfigType;
  shopConfig: ShopConfigType;
  blogConfig: BlogConfigType;
  shopInfo: Shop;
}

const CartScreen = ({ siteConfig, shopConfig, blogConfig }: PropTypes) => {
  const items = useSelector(selectItems);
  const info = useSelector(selectInfo);

  const handleCheckout = (): void => {
    if (info.checkoutUrl != null) {
      window.open(info.checkoutUrl);
    }
  };

  return (
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
        siteConfig={siteConfig}
        blogConfig={blogConfig}
        shopConfig={shopConfig}
        className={classes.root}
      >
        <div className={classes.itemSection}>
          <div className={classes.itemHeader}>
            <p className={classes.itemTitle}>Item</p>
            <p className={classes.priceTitle}>Price</p>
            <p className={classes.quantityTitle}>Qty</p>
          </div>
          {items.map((lineItem: CartItemType) => (
            <CartItem key={lineItem.id} lineItem={lineItem} />
          ))}
        </div>
        <div className={classes.infoSection}>
          <div className={classes.pricingContainer}>
            <p className={classes.title}>Cart</p>
            <div className={classes.splitText}>
              <div className={classes.titles}>
                <p>Subtotal:</p>
                <p>Taxes:</p>
                <p>Total:</p>
              </div>
              <div className={classes.costs}>
                <p>$ {info.subtotal}</p>
                <p>$ {info.totalTax}</p>
                <p>$ {info.total}</p>
              </div>
            </div>
            <button
              className={classes.checkoutButton}
              disabled={info.checkoutUrl == null}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  const shopConfig = await getShopConfig();
  const blogConfig = await getBlogConfig();
  const shopInfo = await getShopInfo();

  return {
    props: {
      siteConfig,
      shopConfig,
      blogConfig,
      shopInfo,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export default CartScreen;
