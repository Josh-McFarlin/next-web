import React from "react";

const LinkRender = ({ children }) => (
  <span>
    {children}
    <span role="img" aria-label="Link">
      {" 🌍"}
    </span>
  </span>
);

export default {
  name: "titledLink",
  type: "object",
  title: "Titled Link",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "href",
      type: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["https", "http", "mailto", "tel"],
        }),
    },
  ],
  blockEditor: {
    icon: () => "🌍",
    render: LinkRender,
  },
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Link",
      };
    },
  },
};
