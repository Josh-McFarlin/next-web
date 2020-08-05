import React from "react";

const LinkRender = ({ children }) => (
  <span>
    {children}{" "}
    <span role="img" aria-label="Link">
      🌍
    </span>
  </span>
);

export default {
  title: "Titled Link",
  name: "titledLink",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      title: "URL",
      name: "href",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
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
