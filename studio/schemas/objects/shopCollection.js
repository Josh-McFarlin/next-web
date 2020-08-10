import ShopHandleSelector from "../../components/ShopHandleSelector";

export default {
  name: "shopCollection",
  type: "object",
  title: "Shop Collection",
  fields: [
    {
      name: "header",
      type: "string",
      title: "Header",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "handle",
      type: "string",
      title: "Handle",
      inputComponent: ShopHandleSelector,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subcollections",
      type: "array",
      of: [{ type: "shopCollection" }],
      title: "Sub-Collections",
    },
  ],
  preview: {
    select: {
      title: "header",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Shop Collection",
      };
    },
  },
};
