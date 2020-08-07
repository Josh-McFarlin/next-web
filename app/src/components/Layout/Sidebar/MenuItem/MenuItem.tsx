import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleSidebarOpen } from "../../../../utils/store/navigation/navigationSlice";
import { RouteType } from "../../../../../types/sanity/documents/route";
import { LinkType } from "../../../../../types/sanity/objects/link";
import urls from "../../../../utils/urls";
import classes from "./MenuItem.module.scss";

interface PropTypes {
  item: RouteType | LinkType;
}

const conditionalJoin = (slug: string | string[] | undefined): string => {
  if (slug === undefined) return "";

  return typeof slug === "string" ? slug : slug.join("/");
};

const MenuItem = ({ item }: PropTypes) => {
  const { title } = item;
  const router = useRouter();
  const dispatch = useDispatch();

  let isActive = false;
  if ("slug" in item && item.slug != null) {
    isActive =
      router.pathname === urls.pages.sanityPage() &&
      conditionalJoin(router.query.slug) === item.slug.current;
  }

  return (
    <button
      className={classes.root}
      onClick={() => dispatch(toggleSidebarOpen())}
    >
      {"slug" in item && item.slug != null ? (
        <Link
          href={{
            pathname: urls.pages.sanityPage(),
            query: { slug: item.slug.current },
          }}
          as={urls.pages.sanityPage(item.slug.current)}
        >
          <div className={clsx(classes.container, isActive && classes.active)}>
            <p className={classes.text}>{title}</p>
          </div>
        </Link>
      ) : (
        <a
          className={classes.container}
          href={"href" in item ? item.href : undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={classes.text}>{title}</p>
        </a>
      )}
    </button>
  );
};

export default MenuItem;
