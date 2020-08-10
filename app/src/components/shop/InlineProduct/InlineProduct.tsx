import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import range from "lodash/range";
import Link from "next/link";
import { Product } from "shopify-buy";
import urls from "../../../utils/urls";
import classes from "./InlineProduct.module.scss";

interface PropTypes {
  product: Product;
}

const InlineProduct = ({ product }: PropTypes) => {
  const { title, handle, variants, images, createdAt } = product;
  const { title: varTitle, price } = variants[0];
  const [curImageIndex, setCurImage] = React.useState<number>(0);
  const [showSelector, setShowSelector] = React.useState<boolean>(false);
  const maxImages = Math.min(images.length, 5);
  const isNew = dayjs(createdAt).isAfter(dayjs().subtract(1, "month"));

  const handleSwitchImage = (event: React.MouseEvent, index: number): void => {
    event.stopPropagation();

    setCurImage(index);
  };

  return (
    <Link
      href={urls.pages.shop.products.product()}
      as={urls.pages.shop.products.product(handle)}
    >
      <div
        className={classes.root}
        onMouseEnter={() => setShowSelector(true)}
        onMouseLeave={() => setShowSelector(false)}
      >
        <div className={classes.product}>
          {isNew && <div className={classes.newIcon}>New</div>}
          {images?.[curImageIndex]?.src != null ? (
            <img
              className={classes.productImage}
              src={images[curImageIndex].src}
              alt={`Product: ${title} - ${varTitle}`}
            />
          ) : (
            <div className={classes.productImage} />
          )}
          <div className={classes.infoContainer}>
            <p className={classes.title}>{title}</p>
            <p className={classes.price}>${price}</p>
          </div>
          {showSelector && (
            <div className={classes.imageNav}>
              {range(maxImages).map((index) => (
                <div
                  key={index}
                  className={classes.circleWrapper}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    className={clsx(
                      classes.circle,
                      curImageIndex === index && classes.selected
                    )}
                    onClick={(event) => handleSwitchImage(event, index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default InlineProduct;
