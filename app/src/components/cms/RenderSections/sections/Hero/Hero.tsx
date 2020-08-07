import * as React from "react";
import BlockContent from "../../../BlockContent";
import Cta from "../Cta";
import { imageBuilder } from "../../../../../utils/sanity/client";
import classes from "./Hero.module.scss";

interface PropTypes {
  heading: string;
  backgroundImage: any;
  tagline: any[];
  ctas: any[];
}

const Hero = ({
  heading,
  backgroundImage,
  tagline = [],
  ctas = [],
}: PropTypes) => {
  const style = backgroundImage
    ? {
        backgroundImage: `url("${imageBuilder
          .image(backgroundImage)
          .width(2000)
          .auto("format")
          .url()}")`,
      }
    : {};

  return (
    <div className={classes.root} style={style}>
      <div className={classes.content}>
        <h1 className={classes.title}>{heading}</h1>
        {tagline.length > 0 && (
          <BlockContent className={classes.tagline} blocks={tagline} />
        )}
        {ctas.length > 0 && (
          <div className={classes.ctas}>
            {ctas.map((cta) => (
              <Cta {...cta} key={cta._key} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
