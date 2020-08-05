export default {
  type: "object",
  name: "form",
  title: "Form",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      description:
        "The name of the form used for notifications, it is not displayed on the website.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "subtitle",
      type: "string",
      title: "Subheading",
    },
    {
      name: "fields",
      type: "array",
      title: "Form Fields",
      of: [
        {
          type: "formField",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Form",
      };
    },
  },
};
