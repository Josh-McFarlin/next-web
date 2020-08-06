export default {
  name: "project",
  type: "object",
  title: "Project",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      title: "Tags",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "portableText",
      title: "Description",
    },
    {
      name: "image",
      type: "figure",
      title: "Image",
    },
    {
      name: "links",
      type: "array",
      of: [{ type: "titledLink" }],
      title: "Links",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Project",
        media,
      };
    },
  },
};
