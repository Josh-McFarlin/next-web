import * as React from "react";
import Skill from "./Skill";
import classes from "./SkillSet.module.scss";

interface PropTypes {
  heading: string;
  skills: any[];
}

const SkillSet = ({ heading, skills }: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.section}>
      <h1 className={classes.heading}>{heading}</h1>
      <div className={classes.skillsList}>
        {skills.map((data) => (
          <Skill key={data.name} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default SkillSet;
