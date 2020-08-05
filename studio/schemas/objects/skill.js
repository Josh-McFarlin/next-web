export default {
  type: "object",
  name: "skill",
  title: "Skill",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
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
