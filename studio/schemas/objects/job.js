export default {
  name: "job",
  type: "object",
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
      name: "startDate",
      type: "date",
      options: {
        dateFormat: "MMMM, YYYY",
        calendarTodayLabel: "Today",
      },
      title: "Start Date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      type: "date",
      options: {
        dateFormat: "MMMM, YYYY",
        calendarTodayLabel: "Today",
      },
      title: "End Date",
    },
    {
      name: "description",
      type: "portableText",
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
