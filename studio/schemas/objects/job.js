export default {
  type: "object",
  name: "job",
  title: "Job",
  fields: [
    {
      name: "company",
      type: "string",
      title: "Company",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "position",
      type: "string",
      title: "Position",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      type: "string",
      title: "Location",
    },
    {
      title: "Start Date",
      name: "startDate",
      type: "date",
      options: {
        dateFormat: "MMMM, YYYY",
        calendarTodayLabel: "Today",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "End Date",
      name: "endDate",
      type: "date",
      options: {
        dateFormat: "MMMM, YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "description",
      type: "simplePortableText",
      title: "Description",
    },
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "position",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
};
