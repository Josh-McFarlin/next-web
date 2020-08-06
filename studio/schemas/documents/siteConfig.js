import bcp47 from "bcp47";

export default {
  name: "site-config",
  type: "document",
  title: "Site Configuration",
  fieldsets: [
    {
      name: "footer",
      title: "Footer",
    },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site title",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Brand logo",
      description:
        "Best choice is to use an SVG where the color are set with currentColor. If a logo is not provided, the site title will be used.",
      name: "logo",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      description: "The main site url. Used to create canonical url",
    },
    {
      name: "frontpage",
      type: "reference",
      description: "Choose page to be the frontpage",
      to: { type: "page" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lang",
      type: "string",
      title: "Site language",
      description:
        "Should be a valid bcp47 language code like en, en-US, no or nb-NO",
      validation: (Rule) =>
        Rule.custom((lang) =>
          bcp47.parse(lang) ? true : "Please use a valid bcp47 code"
        ),
    },
    {
      name: "favicon",
      type: "image",
      title: "Favicon",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainNavigation",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "route" }],
        },
        { type: "link" },
      ],
      title: "Main navigation",
      description: "Select pages for the top menu",
      validation: (Rule) => [
        Rule.max(5).warning("Are you sure you want more than 5 items?"),
        Rule.unique().error("You have duplicate menu items"),
      ],
    },
    {
      name: "footerNavigation",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "route" }],
        },
        { type: "link" },
      ],
      fieldset: "footer",
      title: "Footer navigation items",
      validation: (Rule) => [
        Rule.max(10).warning("Are you sure you want more than 10 items?"),
        Rule.unique().error("You have duplicate menu items"),
      ],
    },
    {
      name: "footerText",
      type: "portableText",
      fieldset: "footer",
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "socialLinks",
      description: "Links to your other Social Media pages.",
    },
  ],
};
