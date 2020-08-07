export default {
  name: "blog-config",
  type: "document",
  title: "Blog Configuration",
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
      description: "Disable this if you do not plan on using the blog",
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
  ],
  preview: {
    select: {
      title: "title",
      media: "openGraphImage",
    },
  },
};
