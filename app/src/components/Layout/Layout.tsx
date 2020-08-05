import * as React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { SiteConfigType } from "../../../types/siteConfig";

interface PropTypes extends React.HTMLProps<HTMLDivElement> {
  siteConfig: SiteConfigType;
}

const Layout = ({ siteConfig, children, ...rest }: PropTypes) => {
  if (siteConfig?.config == null) {
    console.error("Missing config");

    return <div>Missing config</div>;
  }

  const { config, favicons } = siteConfig;
  const { name, mainNavigation, footerNavigation, footerText, logo } = config;

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
        <Header name={name} logo={logo} navItems={mainNavigation} />
        <Sidebar navItems={mainNavigation} />
        <div id="content" {...rest}>
          {children}
        </div>
        <Footer navItems={footerNavigation} text={footerText} />
      </>
    </>
  );
};

export default Layout;
