import * as React from "react";
import Link from "next/link";
import urls from "../../../../../utils/urls";
import classes from "./Cta.module.scss";

interface PropTypes {
  title: string;
  route?: {
    slug: {
      current?: string;
    };
  };
  link?: string;
}

const cta = ({ title, route, link }: PropTypes) => {
  if (route?.slug?.current != null) {
    return (
      <Link
        href={{
          pathname: urls.pages.sanityPage(),
          query: { slug: route.slug.current },
        }}
        as={urls.pages.sanityPage(route.slug.current)}
      >
        <a className={classes.button}>{title}</a>
      </Link>
    );
  }

  if (link != null) {
    return (
      <a className={classes.root} href={link}>
        {title}
      </a>
    );
  }

  return <a className={classes.root}>{title}</a>;
};

export default cta;
