export default {
  name: "projectsSection",
  type: "object",
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
      of: [{ type: "project" }],
      title: "Projects",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title ?? "Projects Section",
        subtitle: title != null ? "Projects Section" : "",
      };
    },
  },
};
