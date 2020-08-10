import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import CollectionItem from "./CollectionItem";
import { selectSidebarOpen } from "../../../utils/store/navigation/selectors";
import { setSidebarOpen } from "../../../utils/store/navigation/navigationSlice";
import { RouteType } from "../../../../types/sanity/documents/route";
import { LinkType } from "../../../../types/sanity/objects/link";
import { BlogConfigType } from "../../../../types/sanity/documents/blogConfig";
import { ShopConfigType } from "../../../../types/sanity/documents/shopConfig";
import { ShopCollectionType } from "../../../../types/sanity/objects/shopCollection";
import urls from "../../../utils/urls";
import classes from "./Sidebar.module.scss";

interface PropTypes {
  navItems: (RouteType | LinkType)[];
  width?: number;
  blogConfig: BlogConfigType;
  shopConfig: ShopConfigType;
  inShop: boolean;
}

const backgroundVariants = {
  initial: {
    opacity: 0,
  },
  render: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
};

const sidebarVariants = {
  initial: (width: number) => ({
    x: -width,
  }),
  render: {
    x: 0,
    transition: {
      damping: 0,
      stiffness: 25,
    },
  },
  exit: (width: number) => ({
    x: -width,
    transition: {
      damping: 0,
      stiffness: 25,
    },
  }),
};

const Sidebar = ({
  navItems = [],
  width = 400,
  blogConfig,
  shopConfig,
  inShop,
}: PropTypes) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebarOpen);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = (): void => {
    dispatch(
      setSidebarOpen({
        sidebarOpen: false,
      })
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="root"
          className={classes.root}
          initial="initial"
          animate="render"
          exit="exit"
        >
          <motion.div
            key="sidebar"
            className={classes.sidebar}
            variants={sidebarVariants}
            custom={width}
          >
            <SubMenu width={width} />
            <div className={classes.navigation}>
              {navItems.map((item) => (
                <MenuItem key={item._key} item={item} />
              ))}
              {blogConfig.enabled && blogConfig.display && (
                <MenuItem
                  item={
                    {
                      title: "Blog",
                      slug: {
                        current: urls.pages.blog.index(),
                      },
                    } as any
                  }
                />
              )}
              {shopConfig.enabled && shopConfig.display && (
                <MenuItem
                  item={
                    {
                      title: "Shop",
                      slug: {
                        current: urls.pages.shop.index(),
                      },
                    } as any
                  }
                />
              )}
              {shopConfig.enabled &&
                inShop &&
                shopConfig.mainNavigation.map(
                  (shopCollection: ShopCollectionType) => (
                    <CollectionItem
                      key={shopCollection._key}
                      item={shopCollection}
                    />
                  )
                )}
              {shopConfig.enabled && shopConfig.cart && (
                <MenuItem
                  item={
                    {
                      title: "Cart",
                      slug: {
                        current: urls.pages.shop.cart(),
                      },
                    } as any
                  }
                />
              )}
            </div>
          </motion.div>
          <motion.div
            key="background"
            className={classes.background}
            variants={backgroundVariants}
            initial="initial"
            animate="render"
            exit="exit"
            onClick={handleClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
