export default {
  name: "textSection",
  type: "object",
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
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      heading: "heading",
      label: "label",
    },
    prepare({ heading, label }) {
      return {
        title: heading ?? label ?? "Text Section",
        subtitle: heading != null || label != null ? "Text Section" : "",
      };
    },
  },
};
