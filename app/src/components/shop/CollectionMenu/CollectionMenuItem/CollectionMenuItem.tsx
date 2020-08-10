import * as React from "react";
import Link from "next/link";
import { ShopCollectionType } from "../../../../../types/sanity/objects/shopCollection";
import urls from "../../../../utils/urls";
import classes from "./CollectionMenuItem.module.scss";

interface PropTypes {
  item: ShopCollectionType;
}

const CollectionMenuItem = ({ item }: PropTypes) => {
  const { header, handle, subcollections = [] } = item;

  return (
    <div className={classes.root}>
      <Link
        href={urls.pages.shop.collections.collection()}
        as={urls.pages.shop.collections.collection(handle)}
      >
        <a>{header}</a>
      </Link>
      {subcollections.length > 0 && (
        <div className={classes.subcollections}>
          {subcollections.map((collection: ShopCollectionType) => (
            <CollectionMenuItem key={collection._key} item={collection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionMenuItem;
