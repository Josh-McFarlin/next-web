import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import CartIcon from "react-ionicons/lib/IosCartOutline";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import SidebarToggle from "../SidebarToggle";
import { setCartOpen } from "../../../utils/store/cart/cartSlice";
import { LinkType } from "../../../../types/sanity/objects/link";
import { RouteType } from "../../../../types/sanity/documents/route";
import { BlogConfigLayoutType } from "../../../../types/sanity/documents/blogConfig";
import { ShopConfigLayoutType } from "../../../../types/sanity/documents/shopConfig";
import urls from "../../../utils/urls";
import classes from "./Header.module.scss";

interface PropTypes {
  title: string;
  logo?: {
    asset: {
      url: string;
    };
  };
  navItems: (RouteType | LinkType)[];
  blogConfig: BlogConfigLayoutType;
  shopConfig: ShopConfigLayoutType;
}

const conditionalJoin = (slug: string | string[] | undefined): string => {
  if (slug === undefined) return "";

  return typeof slug === "string" ? slug : slug.join("/");
};

const noOp = () => false;

const Header = ({
  title,
  navItems = [],
  shopConfig,
  blogConfig,
}: PropTypes) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCartOpen = (): void => {
    if (router.asPath !== urls.pages.shop.cart()) {
      dispatch(
        setCartOpen({
          isOpen: true,
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <SidebarToggle />
      <h1 className={classes.branding}>
        <Link href={urls.pages.sanityPage()} as={urls.pages.sanityPage("/")}>
          <a title={title}>
            <h1 className={classes.title}>{title}</h1>
          </a>
        </Link>
      </h1>
      <div className={classes.nav}>
        <div className={classes.navItems}>
          {navItems.map((item) => {
            const { _key, title } = item;

            let isActive = false;
            if ("slug" in item && item.slug != null) {
              isActive =
                router.pathname === urls.pages.sanityPage() &&
                conditionalJoin(router.query.slug) === item.slug.current;
            }

            return (
              <div
                key={_key}
                className={clsx(classes.navItem, isActive && classes.active)}
              >
                {"slug" in item && item.slug != null ? (
                  <Link
                    href={{
                      pathname: urls.pages.sanityPage(),
                      query: { slug: item.slug.current },
                    }}
                    as={urls.pages.sanityPage(item.slug.current)}
                  >
                    <a>{title}</a>
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
          {blogConfig.enabled && blogConfig.display && (
            <div className={classes.navItem}>
              <Link href={urls.pages.blog.index()}>
                <a>Blog</a>
              </Link>
            </div>
          )}
          {shopConfig.enabled && shopConfig.display && (
            <div className={classes.navItem}>
              <Link href={urls.pages.shop.index()}>
                <a>Shop</a>
              </Link>
            </div>
          )}
          {shopConfig.enabled && shopConfig.display && shopConfig.cart && (
            <div className={classes.navItem}>
              <Link href={urls.pages.shop.cart()}>
                <a
                  onMouseEnter={handleCartOpen}
                  onTouchStart={noOp}
                  onTouchEnd={noOp}
                  onTouchMove={noOp}
                >
                  <CartIcon className={classes.cartIcon} fontSize="28px" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
