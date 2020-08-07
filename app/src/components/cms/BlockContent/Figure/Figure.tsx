import * as React from "react";
import { imageBuilder } from "../../../../utils/sanity/client";
import classes from "./Figure.module.scss";

interface PropTypes {
  node: {
    alt: string;
    asset: {
      _ref: string;
    };
  };
}

const Figure = ({ node }: PropTypes) => (
  <img
    className={classes.root}
    src={
      imageBuilder.image(node.asset).auto("format").width(2000).url() ??
      undefined
    }
    alt={node.alt}
  />
);

export default Figure;
