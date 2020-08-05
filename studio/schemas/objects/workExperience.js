export default {
  type: "object",
  name: "workExperience",
  title: "Work Experience",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "jobs",
      type: "array",
      title: "Jobs",
      of: [
        {
          type: "job",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Work Experience",
      };
    },
  },
};
