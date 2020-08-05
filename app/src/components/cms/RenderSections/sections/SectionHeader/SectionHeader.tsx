import * as React from "react";
import classes from "./SectionHeader.module.scss";

interface PropTypes {
  header: string;
  align?: string;
  size?: string;
}

const SectionHeader = ({ header, align = "left", size = "md" }: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.section}>
      <h1
        className={classes[`header-${size}`]}
        style={{
          textAlign: align as any,
        }}
      >
        {header}
      </h1>
    </section>
  </div>
);

export default SectionHeader;
