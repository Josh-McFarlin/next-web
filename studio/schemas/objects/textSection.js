export default {
  type: "object",
  name: "textSection",
  title: "Text",
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
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Text Section",
      };
    },
  },
};
