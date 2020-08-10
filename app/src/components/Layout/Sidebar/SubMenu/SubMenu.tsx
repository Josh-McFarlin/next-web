import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import IosArrowBack from "react-ionicons/lib/IosArrowBack";
import MenuItem from "../MenuItem";
import CollectionItem from "../CollectionItem";
import { setSubmenuOpen } from "../../../../utils/store/navigation/navigationSlice";
import { selectSubmenu } from "../../../../utils/store/navigation/selectors";
import { RouteType } from "../../../../../types/sanity/documents/route";
import { LinkType } from "../../../../../types/sanity/objects/link";
import { ShopCollectionType } from "../../../../../types/sanity/objects/shopCollection";
import classes from "./SubMenu.module.scss";

interface PropTypes {
  width?: number;
}

const subMenuVariants = {
  initial: ({ width }: { width: number }) => ({
    x: width,
  }),
  render: {
    x: 0,
    transition: {
      damping: 0,
      stiffness: 25,
    },
  },
  exit: ({ width }: { width: number }) => ({
    x: width,
    transition: {
      damping: 0,
      stiffness: 25,
    },
  }),
};

const SubMenu = ({ width = 400 }: PropTypes) => {
  const dispatch = useDispatch();
  const { submenuOpen, submenuHeader, submenuItems } = useSelector(
    selectSubmenu
  );

  const handleSubmenuClose = (): void => {
    dispatch(
      setSubmenuOpen({
        submenuOpen: false,
      })
    );
  };

  return (
    <AnimatePresence>
      {submenuOpen && (
        <motion.div
          key={submenuHeader ?? "submenu"}
          className={classes.root}
          variants={subMenuVariants}
          initial="initial"
          animate="render"
          exit="exit"
          custom={{
            width,
          }}
        >
          <div className={classes.headerContainer}>
            <button
              className={classes.arrowContainer}
              onClick={handleSubmenuClose}
            >
              <IosArrowBack fontSize="32px" color="black" />
            </button>
            <p>{submenuHeader}</p>
          </div>
          <div className={classes.navigation}>
            {submenuItems.map(
              (item: RouteType | LinkType | ShopCollectionType) => {
                switch ("_type" in item ? item._type : "link") {
                  case "route": {
                    return (
                      <MenuItem key={item._key} item={item as RouteType} />
                    );
                  }
                  case "shopCollection": {
                    return (
                      <CollectionItem
                        key={item._key}
                        item={item as ShopCollectionType}
                      />
                    );
                  }
                  default: {
                    return <MenuItem key={item._key} item={item as LinkType} />;
                  }
                }
              }
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubMenu;
