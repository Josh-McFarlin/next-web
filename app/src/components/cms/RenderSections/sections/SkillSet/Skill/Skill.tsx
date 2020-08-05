import * as React from "react";
import { imageBuilder } from "../../../../../../utils/sanity/client";
import classes from "./Skill.module.scss";

interface PropTypes {
  name?: string;
  image?: any;
}

const Skill = ({ name, image }: PropTypes) => {
  const imageStyle =
    image != null
      ? {
          backgroundImage: `url("${imageBuilder
            .image(image)
            .fit("clip")
            .width(26)
            .height(22)
            .dpr(3)
            .auto("format")
            .ignoreImageParams()
            .url()}")`,
          backgroundSize: "contain",
        }
      : {};

  return (
    <div className={classes.root}>
      {image && <div style={imageStyle} className={classes.skillImage} />}
      {name && <p className={classes.skillText}>{name}</p>}
    </div>
  );
};

export default Skill;
