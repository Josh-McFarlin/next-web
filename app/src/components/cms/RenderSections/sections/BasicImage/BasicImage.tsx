import * as React from "react";
import { imageBuilder } from "../../../../../utils/sanity/client";
import classes from "./BasicImage.module.scss";

interface PropTypes {
  image: any;
  circular?: boolean;
  width?: number;
  maxWidth?: number;
  height?: number;
  maxHeight?: number;
}

const defaultSize = 500;

const BasicImage = ({
  image,
  circular = false,
  width,
  maxWidth,
  height,
  maxHeight,
}: PropTypes) => {
  const imageContainer = React.useRef(null);

  if (image.image == null) {
    return null;
  }

  const contStyle = {
    width: `${width}vw`,
    height: `${height}vh`,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  };

  const smaller = width && height ? Math.min(width, height) : defaultSize;

  const imageWidth = width ?? maxWidth ?? defaultSize;
  const imageHeight = height ?? maxHeight ?? defaultSize;

  const src = imageBuilder
    .image(image)
    .width(imageWidth)
    .height(imageHeight)
    .dpr(3)
    .fit("clip")
    .auto("format")
    .url();

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div
          className={classes.imageContainer}
          style={contStyle}
          ref={imageContainer}
        >
          <div
            style={{
              borderRadius: circular ? "50%" : "0",
              width: smaller,
              height: smaller,
              backgroundImage: `url('${src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default BasicImage;
