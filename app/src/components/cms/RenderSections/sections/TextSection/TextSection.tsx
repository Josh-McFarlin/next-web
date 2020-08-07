import * as React from "react";
import BlockContent from "../../../BlockContent";
import classes from "./TextSection.module.scss";

interface PropTypes {
  heading: string;
  label?: string;
  text: any[];
}

const TextSection = ({ heading, label = "", text }: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.section}>
      <div className={classes.label}>{label}</div>
      <h1 className={classes.heading}>{heading}</h1>
      <BlockContent className={classes.textContainer} blocks={text} />
    </section>
  </div>
);

export default TextSection;
