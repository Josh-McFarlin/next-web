export default {
  type: "object",
  name: "school",
  title: "School",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "location",
      type: "string",
      title: "Location",
    },
    {
      title: "Start Year",
      name: "startYear",
      type: "date",
      options: {
        dateFormat: "YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      title: "End Year",
      name: "endYear",
      type: "date",
      options: {
        dateFormat: "YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "description",
      type: "simplePortableText",
      title: "Description",
    },
    {
      name: "completedCourses",
      type: "array",
      title: "Completed Courses",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "currentCourses",
      type: "array",
      title: "Current Courses",
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
