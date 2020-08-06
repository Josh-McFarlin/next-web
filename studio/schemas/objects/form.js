export default {
  name: "form",
  type: "object",
  title: "Form",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      description:
        "The title of the form used for notifications, it is not displayed on the website.",
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
      of: [
        {
          type: "formField",
        },
      ],
      title: "Form Fields",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Form",
      };
    },
  },
};
