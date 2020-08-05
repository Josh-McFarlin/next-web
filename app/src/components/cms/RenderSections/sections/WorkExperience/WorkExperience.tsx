import * as React from "react";
import Job from "./Job";
import classes from "./WorkExperience.module.scss";

interface PropTypes {
  heading: string;
  jobs: any[];
}

const WorkExperience = ({ heading, jobs }: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.section}>
      <h1 className={classes.heading}>{heading}</h1>
      <div>
        {jobs.map((data) => (
          <Job key={data.company + data.position} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default WorkExperience;
