export default {
  type: "object",
  name: "basicImage",
  title: "Basic Image",
  fields: [
    {
      name: "circular",
      type: "boolean",
      title: "Circular",
    },
    {
      name: "image",
      type: "figure",
      title: "Image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "width",
      type: "number",
      title: "Width (percent)",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "height",
      type: "number",
      title: "Height (percent)",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "maxWidth",
      type: "number",
      title: "Max Width (px)",
      validation: (Rule) => Rule.integer().min(1),
    },
    {
      name: "maxHeight",
      type: "number",
      title: "Max Height (px)",
      validation: (Rule) => Rule.integer().min(1),
    },
  ],
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Image",
        media,
      };
    },
  },
};
