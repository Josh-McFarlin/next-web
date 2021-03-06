import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import CartIcon from "react-ionicons/lib/IosCartOutline";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import SidebarToggle from "../SidebarToggle";
import { setCartOpen } from "../../../utils/store/cart/cartSlice";
import { setCollectionMenuOpen } from "../../../utils/store/navigation/navigationSlice";
import { LinkType } from "../../../../types/sanity/objects/link";
import { RouteType } from "../../../../types/sanity/documents/route";
import { BlogConfigType } from "../../../../types/sanity/documents/blogConfig";
import { ShopConfigType } from "../../../../types/sanity/documents/shopConfig";
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
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  inShop: boolean;
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
  inShop,
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

  const handleColMenuOpen = (): void => {
    if (router.asPath !== urls.pages.shop.collections.all()) {
      dispatch(
        setCollectionMenuOpen({
          collectionMenuOpen: true,
        })
      );
    }
  };

  const isRouteActive = (item: RouteType | LinkType | string): boolean => {
    if (typeof item === "string") return item === router.asPath;

    let isActive = false;
    if ("slug" in item && item.slug != null) {
      isActive =
        router.pathname === urls.pages.sanityPage() &&
        conditionalJoin(router.query.slug) === item.slug.current;
    }

    return isActive;
  };

  return (
    <div className={classes.root}>
      <SidebarToggle />
      <h1 className={classes.branding}>
        <Link href={urls.pages.index()}>
          <a title={title}>
            <h1 className={classes.title}>{title}</h1>
          </a>
        </Link>
      </h1>
      <div className={classes.nav}>
        <div className={classes.navItems}>
          {navItems.map((item) => {
            const { _key, title } = item;

            return (
              <div
                key={_key}
                className={clsx(
                  classes.navItem,
                  isRouteActive(item) && classes.active
                )}
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
            <div
              className={clsx(
                classes.navItem,
                isRouteActive(urls.pages.blog.index()) && classes.active
              )}
            >
              <Link href={urls.pages.blog.index()}>
                <a>Blog</a>
              </Link>
            </div>
          )}
          {shopConfig.enabled && shopConfig.display && (
            <div
              className={clsx(
                classes.navItem,
                isRouteActive(urls.pages.shop.index()) && classes.active
              )}
            >
              <Link href={urls.pages.shop.index()}>
                <a>Shop</a>
              </Link>
            </div>
          )}
          {shopConfig.enabled &&
            shopConfig.display &&
            shopConfig.mainNavigation.length > 0 && (
              <div
                className={clsx(
                  classes.navItem,
                  isRouteActive(urls.pages.shop.collections.all()) &&
                    classes.active
                )}
              >
                <Link href={urls.pages.shop.collections.all()}>
                  <a
                    onMouseEnter={handleColMenuOpen}
                    onTouchStart={noOp}
                    onTouchEnd={noOp}
                    onTouchMove={noOp}
                  >
                    Collections
                  </a>
                </Link>
              </div>
            )}
          {shopConfig.enabled && shopConfig.display && shopConfig.cart && (
            <div className={classes.navItem}>
              <Link href={urls.pages.shop.cart()}>
                <a
                  className={classes.cartIconContainer}
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
