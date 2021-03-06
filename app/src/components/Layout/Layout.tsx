import * as React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CollectionMenu from "../shop/CollectionMenu";
import { SiteConfigType } from "../../../types/sanity/documents/siteConfig";
import { BlogConfigType } from "../../../types/sanity/documents/blogConfig";
import { ShopConfigType } from "../../../types/sanity/documents/shopConfig";
import classes from "./Layout.module.scss";

interface PropTypes extends React.HTMLProps<HTMLDivElement> {
  preview: boolean;
  siteConfig: SiteConfigType;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  inShop?: boolean;
}

const Layout = ({
  preview,
  siteConfig,
  blogConfig,
  shopConfig,
  inShop = false,
  children,
  ...rest
}: PropTypes) => {
  if (siteConfig?.config == null) {
    console.error("Missing config");

    return <div>Missing config</div>;
  }

  const { config, favicons } = siteConfig;
  const { title, mainNavigation, footerNavigation, footerText, logo } = config;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={favicons.appleIconUrl}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={favicons.thirtyIconUrl}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={favicons.sixIconUrl}
        />
      </Head>
      <>
        <Header
          title={title}
          logo={logo}
          navItems={mainNavigation}
          blogConfig={blogConfig}
          shopConfig={shopConfig}
          inShop={inShop}
        />
        <CollectionMenu collections={shopConfig.mainNavigation} />
        <Sidebar
          navItems={mainNavigation}
          blogConfig={blogConfig}
          shopConfig={shopConfig}
          inShop={inShop}
        />
        <div id="content" {...rest}>
          {children}
        </div>
        <Footer navItems={footerNavigation} text={footerText} />
        {preview && (
          <a className={classes.exitPreviewButton} href="/api/exit-preview">
            Exit Preview
          </a>
        )}
      </>
    </>
  );
};

export default Layout;
