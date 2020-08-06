import * as React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../../../Icon";
import { toggleSidebarOpen } from "../../../../utils/store/navigation/navigationSlice";
import { RouteType } from "../../../../../types/sanity/documents/route";
import urls from "../../../../utils/urls";
import classes from "./MenuItem.module.scss";

interface MenuItemType extends RouteType {
  link?: string;
}

interface PropTypes {
  item: MenuItemType;
}

const MenuItem = ({ item }: PropTypes) => {
  const { slug, title, link, icon } = item;
  const router = useRouter();
  const dispatch = useDispatch();

  console.log("item", item);

  const isActive =
    router.pathname === urls.pages.sanityPage() &&
    router?.query?.slug === slug?.current;

  return (
    <button
      className={classes.root}
      onClick={() => dispatch(toggleSidebarOpen())}
    >
      {slug != null ? (
        <Link
          href={{
            pathname: urls.pages.sanityPage(),
            query: { slug: slug.current },
          }}
          as={urls.pages.sanityPage(slug.current)}
        >
          <div
            className={classes.container}
            data-is-active={isActive ? "true" : "false"}
          >
            {icon != null && <Icon type={icon} className={classes.icon} />}
            <p className={classes.text}>{title}</p>
          </div>
        </Link>
      ) : (
        <a
          className={classes.linkText}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={classes.container}
            data-is-active={isActive ? "true" : "false"}
          >
            {icon != null && <Icon type={icon} className={classes.icon} />}
            <p className={classes.text}>{title}</p>
          </div>
        </a>
      )}
    </button>
  );
};

export default MenuItem;
