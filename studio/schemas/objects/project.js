export default {
  type: "object",
  name: "project",
  title: "Project",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "description",
      type: "simplePortableText",
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
      title: "Links",
      of: [
        {
          type: "titledLink",
        },
      ],
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
