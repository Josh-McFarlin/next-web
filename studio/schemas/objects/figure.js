export default {
  name: "figure",
  type: "image",
  title: "Image",
  options: {
    hotspot: true,
    metadata: ["lqip"],
  },
  fields: [
    {
      name: "caption",
      type: "string",
      options: {
        isHighlighted: true,
      },
      title: "Caption",
    },
    {
      name: "alt",
      type: "string",
      options: {
        isHighlighted: true,
      },
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "caption",
      imageUrl: "asset.url",
    },
  },
};
