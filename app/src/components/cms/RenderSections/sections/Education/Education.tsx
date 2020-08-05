import * as React from "react";
import School from "./School";
import classes from "./Education.module.scss";

interface PropTypes {
  heading: string;
  schools: {
    name: string;
    location: string;
    startYear: string;
    endYear: string;
    description: any[];
    completedCourses: string[];
    currentCourses: string[];
  }[];
}

const Education = ({ heading, schools }: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.education}>
      <h1 className={classes.heading}>{heading}</h1>
      <div>
        {schools.map((data) => (
          <School key={data.name + data.startYear} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default Education;
