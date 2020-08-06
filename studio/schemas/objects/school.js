export default {
  name: "school",
  type: "object",
  title: "School",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      type: "string",
      title: "Location",
    },
    {
      name: "startYear",
      type: "date",
      options: {
        dateFormat: "YYYY",
        calendarTodayLabel: "Today",
      },
      title: "Start Year",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endYear",
      type: "date",
      options: {
        dateFormat: "YYYY",
        calendarTodayLabel: "Today",
      },
      title: "End Year",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "portableText",
      title: "Description",
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
