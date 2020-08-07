import * as React from "react";
import BlockContent from "../../../../BlockContent";
import classes from "./School.module.scss";

interface PropTypes {
  name: string;
  location: string;
  startYear: string;
  endYear: string;
  description: any[];
  completedCourses: string[];
  currentCourses: string[];
}

const School = ({
  name,
  location,
  startYear,
  endYear,
  description,
  completedCourses = [],
  currentCourses = [],
}: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.school}>
      <h2 className={classes.heading}>{name}</h2>
      <div className={classes.details}>
        {`${new Date(startYear).getUTCFullYear()} - ${new Date(
          endYear
        ).getUTCFullYear()} in ${location}`}
      </div>
      {description && <BlockContent blocks={description} />}
      {completedCourses.length > 0 && (
        <div>
          <div className={classes.details}>Completed Courses</div>
          <ul className={classes.courseList}>
            {completedCourses.map((course) => (
              <li key={course} className={classes.details}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentCourses.length > 0 && (
        <div>
          <div className={classes.details}>Current Courses</div>
          <ul>
            {currentCourses.map((course) => (
              <li key={course} className={classes.details}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  </div>
);

export default School;
