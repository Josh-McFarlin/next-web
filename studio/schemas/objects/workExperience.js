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
      of: [{ type: "job" }],
      title: "Jobs",
      validation: (Rule) => Rule.required(),
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
