export default {
  name: "skillSet",
  type: "object",
  title: "Skill Set",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "skills",
      type: "array",
      of: [{ type: "skill" }],
      title: "Skills",
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
        subtitle: "Skill Set",
      };
    },
  },
};
