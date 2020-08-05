import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SimpleBlockContent from "../../cms/SimpleBlockContent";
import urls from "../../../utils/urls";
import classes from "./Footer.module.scss";

interface PropTypes {
  navItems: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }[];
  text: any[];
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
              const isActive =
                router.pathname === urls.pages.sanityPage() &&
                router.query.slug === item.slug.current;

              return (
                <li key={item._id} className={classes.item}>
                  <Link
                    href={{
                      pathname: urls.pages.sanityPage(),
                      query: { slug: item.slug.current },
                    }}
                    as={urls.pages.sanityPage(item.slug.current)}
                  >
                    <a data-is-active={isActive ? "true" : "false"}>
                      {item.title}
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
      <div className={classes.text}>
        <SimpleBlockContent blocks={text} />
      </div>
    </div>
  );
};

export default Footer;
