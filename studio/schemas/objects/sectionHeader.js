export default {
  name: "sectionHeader",
  type: "object",
  title: "Section Header",
  fields: [
    {
      name: "header",
      type: "string",
      title: "Header",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "size",
      type: "string",
      options: {
        list: [
          {
            title: "Small",
            value: "sm",
          },
          {
            title: "Medium",
            value: "md",
          },
          {
            title: "Large",
            value: "lg",
          },
        ],
      },
      title: "Size",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "align",
      type: "string",
      options: {
        list: [
          {
            title: "Left",
            value: "left",
          },
          {
            title: "Center",
            value: "center",
          },
          {
            title: "Right",
            value: "right",
          },
        ],
      },
      title: "Align",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "header",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Section Header",
      };
    },
  },
};
