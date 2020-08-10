import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import IosArrowForward from "react-ionicons/lib/IosArrowForward";
import {
  toggleSidebarOpen,
  setSubmenuOpen,
} from "../../../../utils/store/navigation/navigationSlice";
import { ShopCollectionType } from "../../../../../types/sanity/objects/shopCollection";
import urls from "../../../../utils/urls";
import classes from "./CollectionItem.module.scss";

interface PropTypes {
  item: ShopCollectionType;
}

const CollectionItem = ({ item }: PropTypes) => {
  const { handle, header, subcollections = [] } = item;
  const router = useRouter();
  const dispatch = useDispatch();

  const isActive =
    router.asPath === urls.pages.shop.collections.collection(handle);

  const handleOpenSubmenu = (): void => {
    dispatch(
      setSubmenuOpen({
        submenuOpen: true,
        submenuHeader: item.header,
        submenuItems: subcollections,
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.primaryCollection}>
        <Link
          href={urls.pages.shop.collections.collection()}
          as={urls.pages.shop.collections.collection(handle)}
        >
          <button
            className={clsx(classes.container, isActive && classes.active)}
            onClick={() => dispatch(toggleSidebarOpen())}
          >
            <p className={classes.text}>{header}</p>
          </button>
        </Link>
        {subcollections.length > 0 && (
          <button
            className={classes.arrowContainer}
            onClick={handleOpenSubmenu}
          >
            <IosArrowForward fontSize="32px" color="black" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CollectionItem;
