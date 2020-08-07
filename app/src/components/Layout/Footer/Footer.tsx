import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BlockContent from "../../cms/BlockContent";
import { RouteType } from "../../../../types/sanity/documents/route";
import { LinkType } from "../../../../types/sanity/objects/link";
import { PortableTextType } from "../../../../types/sanity/objects/portableText";
import urls from "../../../utils/urls";
import classes from "./Footer.module.scss";

interface PropTypes {
  navItems: (RouteType | LinkType)[];
  text?: PortableTextType[];
}

const Footer = ({ navItems = [], text = [] }: PropTypes) => {
  const router = useRouter();

  if (navItems.length === 0 && text.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <nav>
        <ul className={classes.items}>
          {navItems &&
            navItems.map((item) => {
              const { _key, title } = item;

              let isActive = false;
              if ("slug" in item && item.slug != null) {
                isActive =
                  router.pathname === urls.pages.sanityPage() &&
                  router.query.slug === item.slug.current;
              }

              return (
                <div key={_key} className={classes.navItem}>
                  {"slug" in item && item.slug != null ? (
                    <Link
                      href={{
                        pathname: urls.pages.sanityPage(),
                        query: { slug: item.slug.current },
                      }}
                      as={urls.pages.sanityPage(item.slug.current)}
                    >
                      <a data-is-active={isActive ? "true" : "false"}>
                        {title}
                      </a>
                    </Link>
                  ) : (
                    <a
                      href={"href" in item ? item.href : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {title}
                    </a>
                  )}
                </div>
              );
            })}
        </ul>
      </nav>
      <div className={classes.text}>
        <BlockContent blocks={text} />
      </div>
    </div>
  );
};

export default Footer;
