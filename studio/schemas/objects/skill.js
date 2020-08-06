export default {
  name: "skill",
  type: "object",
  title: "Skill",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "figure",
      title: "Image",
    },
  ],
  preview: {
    select: {
      heading: "name",
      media: "image",
    },
    prepare({ heading, media }) {
      return {
        title: `Skill: ${heading}`,
        media,
      };
    },
  },
};
