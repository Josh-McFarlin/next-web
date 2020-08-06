import * as React from "react";
import Link from "next/link";
import CartIcon from "react-ionicons/lib/IosCartOutline";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import SidebarToggle from "../SidebarToggle";
import { setCartOpen } from "../../../utils/store/cart/cartSlice";
import { LinkType } from "../../../../types/sanity/objects/link";
import { RouteType } from "../../../../types/sanity/documents/route";
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
}

const noOp = () => false;

const Header = ({ title, navItems = [] }: PropTypes) => {
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
                    <a data-is-active={isActive ? "true" : "false"}>{title}</a>
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
        </div>
      </div>
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
  );
};

export default Header;
