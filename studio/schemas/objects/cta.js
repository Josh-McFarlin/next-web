export default {
  name: "cta",
  type: "object",
  title: "Call to action",
  validation: (Rule) =>
    Rule.custom(
      (fields = {}) =>
        !fields.route || !fields.link || "Only one link type is allowed"
    ),
  fieldsets: [
    {
      title: "Link",
      name: "link",
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
      name: "route",
      type: "reference",
      to: [{ type: "route" }],
      fieldset: "link",
      title: "Internal link",
      description: "Use this to link to a page on this website",
    },
    {
      name: "link",
      type: "url",
      fieldset: "link",
      title: "External link",
      description: "Use this to link to a page on another website",
    },
  ],
  preview: {
    select: {
      title: "title",
      routeTitle: "route.title",
      slug: "route.slug.current",
      link: "link",
    },
    prepare({ title, routeTitle = "", slug, link }) {
      const subtitleExtra = slug
        ? `Slug:/${slug}/`
        : link
        ? `External link: ${link}`
        : "Not set";

      return {
        title,
        subtitle: `${routeTitle} ${subtitleExtra}`,
      };
    },
  },
};
