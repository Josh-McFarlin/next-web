import * as React from "react";
import SimpleBlockContent from "../../../../SimpleBlockContent";
import classes from "./Job.module.scss";

interface PropTypes {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: any[];
}

const Job = ({
  company,
  position,
  location,
  startDate,
  endDate,
  description,
}: PropTypes) => {
  const startForm = new Date(startDate);
  const endForm = new Date(endDate);

  const onlyMonth = {
    month: "long",
    timeZone: "UTC",
  };

  const monYear = {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  let startMonth;
  let startMonYear;
  try {
    startMonth = new Intl.DateTimeFormat("en-US", onlyMonth).format(startForm);
    startMonYear = new Intl.DateTimeFormat("en-US", monYear).format(startForm);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("DT Error", e);
  }

  let dateString;
  let endMonYear;
  if (endDate != null) {
    try {
      endMonYear = new Intl.DateTimeFormat("en-US", monYear).format(endForm);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("DT Error", e);
    }

    dateString =
      startForm.getUTCFullYear() === endForm.getUTCFullYear()
        ? `${startMonth} - ${endMonYear}`
        : `${startMonYear} - ${endMonYear}`;
  } else {
    dateString = `${startMonYear} - Present`;
  }

  return (
    <div className={classes.root} id={`work-${company}`}>
      <section className={classes.section}>
        <h2 className={classes.heading}>
          {position} @ {company}
        </h2>
        <div className={classes.details}>
          {dateString}
          {location && ` in ${location}`}
        </div>
        {description && <SimpleBlockContent blocks={description} />}
      </section>
    </div>
  );
};

export default Job;
