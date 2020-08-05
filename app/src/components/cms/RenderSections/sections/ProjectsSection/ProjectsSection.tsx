import * as React from "react";
import Project from "./Project";
import classes from "./ProjectsSection.module.scss";

interface PropTypes {
  heading?: string;
  projects: {
    name: string;
    tags?: string[];
    description: any;
    image: any;
    links?: {
      title: string;
      href: string;
    }[];
  }[];
}

const ProjectsSection = ({ heading, projects }: PropTypes) => (
  <div className={classes.root}>
    <section className={classes.section}>
      {heading != null && <h1 className={classes.title}>{heading}</h1>}
      <div className={classes.projectList}>
        {projects.map((data) => (
          <Project key={data.name} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default ProjectsSection;
