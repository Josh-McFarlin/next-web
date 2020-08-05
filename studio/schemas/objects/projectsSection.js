export default {
  type: "object",
  name: "projectsSection",
  title: "Projects Section",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "projects",
      type: "array",
      title: "Projects",
      of: [
        {
          type: "project",
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
        subtitle: "Projects Section",
      };
    },
  },
};
