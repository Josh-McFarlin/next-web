import * as React from "react";
import { useSelector } from "react-redux";
import { Shop } from "shopify-buy";
import Layout from "../../components/Layout";
import CartItem from "./CartItem";
import { selectItems, selectInfo } from "../../utils/store/cart/selectors";
import { CartItemType } from "../../utils/store/cart/types";
import { getSiteConfig } from "../../utils/sanity/actions/siteConfig";
import { getShopInfo } from "../../utils/shopify/actions/shop";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import classes from "./CartScreen.module.scss";

interface PropTypes {
  siteConfig: SiteConfigType;
  shopInfo: Shop;
}

const CartScreen = ({ siteConfig }: PropTypes) => {
  const items = useSelector(selectItems);
  const info = useSelector(selectInfo);

  const handleCheckout = (): void => {
    if (info.checkoutUrl != null) {
      window.open(info.checkoutUrl);
    }
  };

  return (
    <Layout siteConfig={siteConfig} className={classes.root}>
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
  );
};

export async function getStaticProps() {
  const siteConfig = await getSiteConfig();
  const shopInfo = await getShopInfo();

  return {
    props: {
      siteConfig,
      shopInfo,
    },
    // At most every 10 minutes
    revalidate: 10 * 60,
  };
}

export default CartScreen;
