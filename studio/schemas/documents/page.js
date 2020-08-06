export default {
  name: "page",
  type: "document",
  title: "Page",
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
      name: "content",
      type: "array",
      of: [
        { type: "hero" },
        { type: "imageSection" },
        { type: "textSection" },
        { type: "workExperience" },
        { type: "projectsSection" },
        { type: "education" },
        { type: "skillSet" },
        { type: "basicImage" },
        { type: "socialLinks" },
        { type: "sectionHeader" },
        { type: "form" },
      ],
      title: "Page sections",
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
