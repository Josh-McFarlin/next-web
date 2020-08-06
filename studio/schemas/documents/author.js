export default {
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      title: "Slug",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "figure",
      title: "Image",
    },
    {
      name: "bio",
      type: "portableText",
      title: "Bio",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
