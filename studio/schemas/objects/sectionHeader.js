export default {
  type: "object",
  name: "sectionHeader",
  title: "Section Heaader",
  fields: [
    {
      name: "header",
      type: "string",
      title: "Header",
    },
    {
      name: "size",
      type: "string",
      title: "Size",
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
    },
    {
      name: "align",
      type: "string",
      title: "Align",
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
