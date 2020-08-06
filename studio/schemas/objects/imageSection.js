export default {
  name: "imageSection",
  type: "object",
  title: "Image with text",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "label",
      type: "string",
      title: "Label",
    },
    {
      name: "text",
      type: "portableText",
      title: "Text",
    },
    {
      name: "image",
      type: "figure",
      title: "Image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cta",
      type: "cta",
      title: "Call to action",
    },
  ],
  preview: {
    select: {
      heading: "heading",
      subtitle: "label",
      media: "image",
    },
    prepare({ heading, media }) {
      return {
        title: `Image: ${heading}`,
        subtitle: "Image section",
        media,
      };
    },
  },
};
