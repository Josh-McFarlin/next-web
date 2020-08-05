import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCartOpen } from "../../../utils/store/cart/cartSlice";
import urls from "../../../utils/urls";
import classes from "./Header.module.scss";

interface PropTypes {
  name: string;
  logo?: {
    asset: {
      url: string;
    };
  };
  navItems: {
    _id: string;
    title: string;
    link: string;
    slug: {
      current: string;
    };
  }[];
}

const Header = ({ name = "Missing name", navItems = [] }: PropTypes) => {
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
      <h1 className={classes.branding}>
        <Link href={urls.pages.index()}>
          <a title={name}>
            <h1 className={classes.title}>{name}</h1>
          </a>
        </Link>
      </h1>
      <nav className={classes.nav}>
        <ul className={classes.navItems}>
          {navItems.map((item) => {
            const { slug, title, link, _id } = item;

            let isActive = false;
            if (slug != null) {
              isActive =
                router.pathname === urls.pages.sanityPage() &&
                router.query.slug === slug.current;
            }

            return (
              <li key={_id} className={classes.navItem}>
                {slug != null ? (
                  <Link
                    href={{
                      pathname: urls.pages.sanityPage(),
                      query: { slug: slug.current },
                    }}
                    as={urls.pages.sanityPage(slug.current)}
                  >
                    <a data-is-active={isActive ? "true" : "false"}>{title}</a>
                  </Link>
                ) : (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <Link href={urls.pages.shop.cart()}>
        <div className={classes.cartButton} onMouseEnter={handleCartOpen}>
          Cart
        </div>
      </Link>
    </div>
  );
};

export default Header;
