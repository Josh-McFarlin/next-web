import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import MenuItem from "./MenuItem";
import { selectSidebarOpen } from "../../../utils/store/navigation/selectors";
import { setSidebarOpen } from "../../../utils/store/navigation/navigationSlice";
import { RouteType } from "../../../../types/sanity/documents/route";
import { LinkType } from "../../../../types/sanity/objects/link";
import { BlogConfigLayoutType } from "../../../../types/sanity/documents/blogConfig";
import { ShopConfigLayoutType } from "../../../../types/sanity/documents/shopConfig";
import classes from "./Sidebar.module.scss";

interface PropTypes {
  navItems: (RouteType | LinkType)[];
  width?: number;
  blogConfig: BlogConfigLayoutType;
  shopConfig: ShopConfigLayoutType;
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
}: PropTypes) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSidebarOpen);

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
          key="background"
          className={classes.root}
          variants={backgroundVariants}
          initial="initial"
          animate="render"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div
            key="sidebar"
            className={classes.sidebar}
            variants={sidebarVariants}
            custom={width}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              event.stopPropagation()
            }
          >
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
                        current: "/blog",
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
                        current: "/shop",
                      },
                    } as any
                  }
                />
              )}
              {shopConfig.enabled && shopConfig.cart && (
                <MenuItem
                  item={
                    {
                      title: "Cart",
                      slug: {
                        current: "/cart",
                      },
                    } as any
                  }
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
