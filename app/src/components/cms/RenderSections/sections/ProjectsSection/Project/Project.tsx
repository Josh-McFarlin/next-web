import * as React from "react";
import SimpleBlockContent from "../../../../SimpleBlockContent";
import { imageBuilder } from "../../../../../../utils/sanity/client";
import classes from "./Project.module.scss";

interface PropTypes {
  name: string;
  tags?: string[];
  description: any;
  image: any;
  links?: {
    title: string;
    href: string;
  }[];
}

const Project = ({
  name,
  tags = [],
  description,
  image,
  links = [],
}: PropTypes) => {
  const projImage = imageBuilder
    .image(image)
    .height(300)
    .dpr(3)
    .auto("format")
    .url();

  const imgStyle = image
    ? {
        backgroundImage: `url("${projImage}")`,
        backgroundSize: "cover",
      }
    : {};

  return (
    <div className={classes.root}>
      <div style={imgStyle} className={classes.image} />
      <div className={classes.content}>
        <h1 className={classes.title}>{name}</h1>
        {description && <SimpleBlockContent blocks={description} />}
        {tags.length > 0 && (
          <div className={classes.tagsContainer}>
            {tags.map((tag) => (
              <div key={tag} className={classes.tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className={classes.linkContainer}>
            {links.map((data) => (
              <a
                key={data.title}
                className={classes.button}
                href={data.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
