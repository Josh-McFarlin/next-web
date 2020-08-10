export default {
  name: "shop-config",
  type: "document",
  title: "Shop Configuration",
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
    },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "enabled",
      type: "boolean",
      title: "Enabled",
      description: "Disable this if you do not plan on using the shop",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "display",
      type: "boolean",
      title: "Show in NavBars",
      description: "Show in header and sidebar",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cart",
      type: "boolean",
      title: "Display Cart",
      description: "Show in header and sidebar",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "This description populates meta-tags on the webpage",
      fieldset: "metadata",
    },
    {
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      description: "Image for sharing previews on Facebook, Twitter etc.",
      fieldset: "metadata",
    },
    {
      name: "mainNavigation",
      type: "array",
      of: [{ type: "shopCollection" }],
      title: "Main navigation",
      description: "Select pages for the top menu",
      validation: (Rule) => [
        Rule.max(5).warning("Are you sure you want more than 5 items?"),
        Rule.unique().error("You have duplicate menu items"),
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "openGraphImage",
    },
  },
};
