import { MdLink } from "react-icons";

export default {
  name: "route",
  type: "document",
  title: "Route",
  icon: MdLink,
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "page",
      type: "reference",
      to: [{ type: "page" }],
      description: "Select the page that this route should point to",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      type: "icon",
      title: "Icon",
    },
    {
      name: "includeInSitemap",
      type: "boolean",
      title: "Include page in sitemap",
      description:
        "Index this website on search engines. Will be added to /sitemap.xml",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "disallowRobots",
      type: "boolean",
      title: "Disallow in robots.txt",
      description: "Hide this route from search engines",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      slug: "slug.current",
      pageTitle: "page.title",
    },
    prepare({ slug, pageTitle }) {
      return {
        title: slug === "/" ? "/" : `/${slug}`,
        subtitle: `Page: ${pageTitle}`,
      };
    },
  },
};
