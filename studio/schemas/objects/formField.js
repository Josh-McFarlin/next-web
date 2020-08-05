export default {
  type: "object",
  name: "formField",
  title: "Form Field",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      type: "string",
      title: "Type",
      description: "The type of information being requested",
      options: {
        list: [
          "text",
          "paragraph",
          "email",
          "tel",
          "date",
          "time",
          "datetime-local",
          "file",
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "required",
      type: "boolean",
      title: "Required",
      description: "If the field is required to submit the form",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "placeholder",
      type: "string",
      title: "Placeholder",
      description: "Text that provides more info for the field",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
