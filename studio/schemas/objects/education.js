export default {
  type: "object",
  name: "education",
  title: "Education",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "schools",
      type: "array",
      title: "Schools",
      of: [
        {
          type: "school",
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
        subtitle: "Education",
      };
    },
  },
};
