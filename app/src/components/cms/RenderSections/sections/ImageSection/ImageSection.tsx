import * as React from "react";
import BlockContent from "../../../BlockContent";
import Cta from "../Cta";
import { imageBuilder } from "../../../../../utils/sanity/client";
import classes from "./ImageSection.module.scss";

interface PropTypes {
  heading: string;
  label: string;
  text: any[];
  image: {
    asset: {
      _ref: string;
    };
  };
  backgroundImage: string;
  tagline: string;
  cta: any;
}

const ImageSection = ({ heading, label, text, image, cta }: PropTypes) => {
  if (image == null) {
    return null;
  }

  return (
    <div className={classes.root}>
      <figure className={classes.content}>
        <img
          src={
            imageBuilder.image(image).auto("format").width(2000).url() ??
            undefined
          }
          className={classes.image}
          alt={heading}
        />
        <figcaption>
          <div className={classes.caption}>
            <div className={classes.captionBox}>
              <div className={classes.label}>{label}</div>
              <h2 className={classes.title}>{heading}</h2>
              {text && <BlockContent blocks={text} />}
              {cta && cta.route && <Cta {...cta} />}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default ImageSection;
