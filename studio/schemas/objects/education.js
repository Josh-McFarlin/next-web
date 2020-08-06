export default {
  name: "education",
  type: "object",
  title: "Education",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "schools",
      type: "array",
      of: [
        {
          type: "school",
        },
      ],
      title: "Schools",
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
        subtitle: "Education",
      };
    },
  },
};
