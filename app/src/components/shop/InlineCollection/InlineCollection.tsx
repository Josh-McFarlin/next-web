import * as React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Collection } from "shopify-buy";
import urls from "../../../utils/urls";
import classes from "./InlineCollection.module.scss";

interface PropTypes {
  collection: Collection;
}

const InlineCollection = ({ collection }: PropTypes) => {
  const { title, image, handle, updated_at } = collection;
  const isNew = dayjs(updated_at).isAfter(dayjs().subtract(1, "month"));

  return (
    <Link
      href={urls.pages.shop.collections.collection()}
      as={urls.pages.shop.collections.collection(handle)}
    >
      <div className={classes.root}>
        <div className={classes.collection}>
          {isNew && <div className={classes.newIcon}>New</div>}
          {image?.src != null ? (
            <img
              className={classes.image}
              src={image?.src}
              alt={`Collection: ${title}`}
            />
          ) : (
            <div className={classes.image} />
          )}
          <div className={classes.infoContainer}>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InlineCollection;
